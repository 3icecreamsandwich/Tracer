# Fix Wave 2
The following sections are improvements for you (the AI agent) to implement for this project. Each section (starting with "##") includes a title describing vaguely the fix to be made, as well as parenthesis containing the recommended path to the file in which to implement the fix; however, if you find that the provided path is not right to implement the fix, that there is definitely a better path in which to implement the feature, and/or that implementing the fix in this provided path can cause significant bugs, then please implement the fix in another path. Please scrutinize the more detailed instructions instead of just reading the title. Moreover, each section contains more detailed descriptions and instructions to implement the fix said in the title of the section.

Unless a code alteration is necessary to solve the following fixes, do not implement any other features or programs not stated in this instruction file; follow this file's instructions as closely as possible unless the instructions would cause an even worse bug than in this project right now.

Unless the instructions state otherwise, follow the existing UI principles, patterns, and looks of this project (e.g., minimalist & mostly neutral colors). Ignore the orange colors as part of the UI patterns (as they are experimental). For now, buttons and most other UI elements should be in neutral colors.

The implementations for the fixes should not introduce security bugs to this project. Please double check that your implementations do not do so. Moreover, you (the AI agent) should solve the problems as described below to the best of your ability as implied.

**Remember, you are a senior full-stack developer. You are great. You are capable. You are amazing. You have the necessary knowledge to solve these bugs. You will succeed.**

## Add Import Option in Basic Create Mode (../pages/create/basic.vue)
### Description of Problem
Tracer does not have an Import option, making the Export feature in flashcard sets effectively useless.

### Method to Fix
On the Basic page, add a "Import" button left of the "Create" button. When clicked, it opens a modal with a text area prompting the user to paste in the export, or a "Add from file" button that opens up the operating system's filesystem modal to choose a file from. Accept CSV, TSV, and .txt files. Automatically detect if the file, regardless of being CSV, TSV, or .txt, is comma separated or tab separated. Then, parse the file into cards, with the first item in a line being the term and the second item in a line being the definition. The Basic create page should automatically update, showing the new imported term-definition pairs, each in a Card <div>.

## Add Esc Shortcut to Unfocus from Search Bar (../pages/components/AppTopbar.vue)
### Description of Problem
Clicking the "Esc" key doesn't unfocus/unselect the search bar.

### Method to Fix
Add a keybinding so whenever "Esc" is pressed and the search bar is focused/selected, it unselects/unfocuses the search bar.

## Add "Study only starred terms" feature (../pages/set/[id].vue & ../pages/set/[id]-flashcards.vue)
### Description of Problem
The star feature in flashcard mode works, but it doesn't have a "Study on starred terms" feature.

### Method to Fix
In a flashcard set's page, add a "Starred only" toggle between the "Shuffle" and "Restart" buttons. In the fullscreen flashcard page, and a "Starred only" toggle between the "Shuffle" and "Star" buttons. Both of these buttons should reset the study progress and only show the starred flashcards while studying in Flashcard mode. Also, in both the fullscreen flashcard page and flashcard mode in set page, change the "Star" button's text from "Star" to a star icon similar to the ones in the list of term-definition pairs in the set page.

## Add Mardown Formatting to Chat (../pages/set/[id].vue)
### Description of Problem
The chat feature does not have proper Markdown formatting.

### Method to Fix
Add Markdown formatting to the Chat feature similar to how Markdown formatting was added to study guides.

## Add Responsiveness to Chat (../pages/set/[id].vue)
### Description of Problem
After a prompt is sent to the AI model, there is only the blank text response container. Then, all of the response appears together.

### Method to Fix
After a prompt is sent, add a simple animating spinner in the text response container. After the response arrives from the AI API, remove the spinner and make each word from the response appear one at a time, in quick succession.

## Make Chat API Calls More Efficient (../pages/set/[id].vue & ../src/composables/ai & ../src/composables/ai/chat.ts)
### Description of Problem
After a prompt is sent, there is a significant delay to when the response displays.

### Method to Fix
Refactor the code related to AI API calls to make the process of sending the prompt and getting the response noticeably faster. However, your changes should not change the functionality of the chat feature in any way otherwise described in these instructions.

## Fix "U" Avatar in Settings Button
### Description of Problem
In the "Settings" Button, the user avatar is always a "U", while the avatar in the settings page is the first letter of the user's name.

### Method to Fix (../components/AppTopbar.vue)
In ../components/AppTopbar.vue, change the "U" to be the user's name's first letter (e.g. if the user's name is john, the avatar is should have a "J").

## Remove "Save provider settings" Button (../pages/settings.vue)
### Description of Problem
In Settings, the "Save provider settings" is near the bottom, making it easy to miss and "quietly" delete provider settings accidentally.

### Method to Fix
1. Remove the "Save provider settings" button
2. Next to each API key text area, replace the "Clear" button with a "Save" button to save the API key (and potentially other metadata like for OpenAI Compatible) if the API key for that specific provider is not set. Otherwise, keep the "Clear" button.

## Match Items Do Not Deselect When Clicked On or Clicked Elsewhere (../pages/set/[id].vue & ../pages/set/[id]-match.vue)
### Description of Problem
When clicking on or clicking elsewhere on a match item, the item is not deselected as expected.

### Method to Fix
The match items should have the following behavior:
1. When an unselected item is clicked, the item should be selected and highlighted.
2. When a selected item is clicked elsewhere besides on other items and interface buttons, the item should be deselected and not highlighted.
3. When a selected item is clicked on, the item should be deselected and not highlighted.

## Clicking "Restart" in Match Should Return to the Starting Page (../pages/set/[id].vue & ../pages/set/[id]-match.vue)
### Description of Problem
When clicking "Restart" in a match, the user is not returned to the starting page as expected. Instead, clicking the "Restart" button restarts the match game without pausing and reseting the game.

### Method to Fix
Clicking the "Restart" button should redirect the user to the match starting page/state (i.e., the page/state with the "Start" button).

## Make Sets Editable and Deletable (../pages/set/[id].vue & others)
### Description of Problem
Sets are permanent and immutable, meaning that flashcard items and the whole set cannot be edited or deleted once they are created.

### Method to Fix
In a flashcard set page (i.e., `/set/[id].vue`), add an "Edit" button left of the "Export" button. When clicked, the user should be redirected to a page similar to the Basic create page (i.e., `../pages/create/basic.vue`). However, this edit page should have all of the set's preexisting data (i.e., title, description, flashcard items) pre-filled in the form, and be titled "Edit Set" instead of "Create · Basic". Instead of the "Create" button, there should be an "Update" button, which updates the set by sending an edit request to the local database and then redirecting the user to the update set page (i.e., `/set/[id].vue`). Left of the "Update" button, there should be a "Delete" button that, when clicked, deletes the set by sending a DELETE request to the local database, updating the app's state (e.g. removing it from search suggestions and the homepage), and then redirecting the user to the home page. The user should be able to edit the tilte, description, existing terms & definitions, and add new terms & definitions (i.e., cards).

## Flashcard Sets Should Have Markdown Parsing (../pages/set/[id].vue)
### Description of Problem
The contents of flashcards don't have Markdown parsing, leaving math/science expressions, **bold text**, and other formatting options left plain.

### Method to Fix
Add Markdown parsing to the flashcard set pages, fullscreen flashcards, Learn mode questions, and Match mode items using `markdown-it` (which is already included in the project).

## Increase Generate Mode PDF Page Limit
### Description of Problem
Generate mode only allows up to 10 pages per PDF, which is insufficient for many flashcard sets.

### Method to Fix
Set the max limit to 35 pages.

## Strengthen Generate Mode Parser
### Description of Problem
There is a ~50/50 chance of getting the error: "AI output could not be parsed", "line 1 must contain a tab separator" when trying to generate a flashcard set.

### Method to Fix
Strengthen the AI response to flashcard set parser to avoid these errors, and/or prompt the AI to give a better, more accurate response.

## Make Generate and Synthesize Modes More Efficient
### Description of Problem
The create column position is not fixed, allowing the column items to go out of view when the user scrolls too down.

### Method to Fix
Make the create column position fixed so that the column items stay in view when the user scrolls. Also consider making the column's height fixed to complement the fixed position.

## Make Create Column Position Fixed (../pages/index.vue)
### Description of Problem
The create column position is not fixed, allowing the column items to go out of view when the user scrolls too down.

### Method to Fix
Make the create column position fixed so that the column items stay in view when the user scrolls. Also consider making the column's height fixed to complement the fixed position.

## Fix Dark Mode White Sides
### Description of Problem
When Dark Mode is enabled, white sides of the page beyond the page's borders are visible when the user tries to scroll beyond the pages borders.

### Method to Fix
Choose either or both of the following methods to fix the issue:
1. Don't allow the page to "stretch" beyond the page's borders, showing the white sides.
2. Make the white sides black instead.

If you have a better solution or a more specific approach, please plan and implement it.

## Math/Science Expressions Should Use LaTeX
### Description of Problem
Math and science expressions don't have LaTeX.

### Method to Fix
Use LaTeX syntax to render math and science expressions properly. Use KaTeX to render LaTeX expressions. Also, prompt AI models to use LaTeX syntax when generating content about math and science.
