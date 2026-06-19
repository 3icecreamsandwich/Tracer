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
    Add a keybinding so whenever "Esc" is pressed and the search bar is focused/selected, it unselects/unfocuses the search bar

## Add "Study only starred terms" feature (../pages/set/[id].vue & ../pages/set/[id]-flashcards.vue)
  ### Description of Problem
    The star feature in flashcard mode works, but it doesn't have a "Study on starred terms" feature.

  ### Method to Fix
    In a flashcard set's page, add a "Starred only" toggle between the "Shuffle" and "Restart" buttons. In the fullscreen flashcard page, and a "Starred only" toggle between the "Shuffle" and "Star" buttons. Both of these buttons should reset the study progress and only show the starred flashcards while studying in Flashcard mode. Also, in the fullscreen flashcard page, add a star similar to the stars in the list of term-definition pairs in the set page to the top-right corner of the card.