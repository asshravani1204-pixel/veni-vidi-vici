// src/data/chapters.js

export const chapters = [
  {
    id: 1,
    title: "Chapter 1",
    unlocked: true,
    sections: [
      {
        narrator: "katerina",
        text: [
          "Paragraph one goes here.",
          "Paragraph two goes here.",
          "Each string in this array is one paragraph."
        ],
        puzzle: null
      }
    ]
  },
  {
    id: 2,
    title: "Chapter 2",
    unlocked: false,
    sections: [
      {
        narrator: "katerina",
        text: ["Placeholder text for chapter 2."],
        puzzle: {
          type: "evidence-board",
          id: "ch2-evidence",
          data: {
            items: ["A torn photograph", "A hotel receipt", "A second phone"],
            correctOrder: [1, 2, 0]
          }
        }
      }
    ]
  }
  // chapters 3–16 will follow this same shape
];