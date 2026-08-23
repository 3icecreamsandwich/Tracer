import type {
  DbClient,
  SavedChat,
  SavedChatListItem,
  SavedChatMessage,
  SavedChatPayload,
  Uuid
} from '../types'
import { nowIsoSql } from '../sql'

type DbChatListRow = {
  id: string
  set_id: string
  title: string
  created_at: string
  updated_at: string
  last_opened_at: string
}

type DbChatRow = DbChatListRow & {
  messages_json: string
}

function rowToListItem(row: DbChatListRow): SavedChatListItem {
  return {
    id: row.id as Uuid,
    setId: row.set_id as Uuid,
    title: row.title,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    lastOpenedAt: row.last_opened_at
  }
}

function isSavedChatMessage(value: unknown): value is SavedChatMessage {
  if (!value || typeof value !== 'object') return false
  const message = value as { role?: unknown; content?: unknown }
  return (
    (message.role === 'user' || message.role === 'assistant') &&
    typeof message.content === 'string'
  )
}

export function parseSavedChatPayload(raw: string): SavedChatPayload {
  const parsed = JSON.parse(raw) as { version?: unknown; messages?: unknown }
  if (parsed?.version !== 1 || !Array.isArray(parsed.messages)) {
    throw new Error('Unsupported saved chat payload')
  }
  if (!parsed.messages.every(isSavedChatMessage)) {
    throw new Error('Invalid saved chat messages')
  }
  return {
    version: 1,
    messages: parsed.messages.map((message) => ({
      role: message.role,
      content: message.content
    }))
  }
}

export function serializeSavedChatPayload(payload: SavedChatPayload) {
  return JSON.stringify({
    version: 1,
    messages: payload.messages.map((message) => ({
      role: message.role,
      content: message.content
    }))
  } satisfies SavedChatPayload)
}

export function createChatsRepo(db: DbClient) {
  return {
    async create(input: {
      id: Uuid
      setId: Uuid
      title: string
      payload: SavedChatPayload
    }): Promise<SavedChat> {
      await db.execute(
        `INSERT INTO chats (
           id, set_id, title, messages_json, created_at, updated_at, last_opened_at
         )
         VALUES (
           ?, ?, ?, ?, ${nowIsoSql()}, ${nowIsoSql()}, ${nowIsoSql()}
         );`,
        [
          input.id,
          input.setId,
          input.title.trim(),
          serializeSavedChatPayload(input.payload)
        ]
      )
      const chat = await this.get(input.id)
      if (!chat) throw new Error('Failed to create saved chat')
      return chat
    },

    async get(id: Uuid): Promise<SavedChat | null> {
      const rows = await db.select<DbChatRow>(
        `SELECT id, set_id, title, messages_json, created_at, updated_at, last_opened_at
         FROM chats
         WHERE id = ?
         LIMIT 1;`,
        [id]
      )
      const row = rows[0]
      if (!row) return null
      return {
        ...rowToListItem(row),
        payload: parseSavedChatPayload(row.messages_json)
      }
    },

    async listBySet(setId: Uuid): Promise<SavedChatListItem[]> {
      const rows = await db.select<DbChatListRow>(
        `SELECT id, set_id, title, created_at, updated_at, last_opened_at
         FROM chats
         WHERE set_id = ?
         ORDER BY last_opened_at DESC, created_at DESC;`,
        [setId]
      )
      return rows.map(rowToListItem)
    },

    async updateMessages(id: Uuid, payload: SavedChatPayload): Promise<void> {
      await db.execute(
        `UPDATE chats
         SET messages_json = ?, updated_at = ${nowIsoSql()}
         WHERE id = ?;`,
        [serializeSavedChatPayload(payload), id]
      )
    },

    async touchOpened(id: Uuid): Promise<void> {
      await db.execute(
        `UPDATE chats
         SET last_opened_at = ${nowIsoSql()}
         WHERE id = ?;`,
        [id]
      )
    },

    async delete(id: Uuid): Promise<void> {
      await db.execute(`DELETE FROM chats WHERE id = ?;`, [id])
    }
  }
}
