const boardInfo = {
  hivemind: {
    boardID: process.env.HIVEMIND_BACKLOGID,
    labelID: {
      bug: "65a307699217e9bccdf10a8e",
      spike: "65a307699217e9bccdf10a8f",
      task: "65a307699217e9bccdf10a87",
      fe: "65a307699217e9bccdf10a97",
      be: "65a307699217e9bccdf10a85",
    },
  },
  dnd: {
    boardID: process.env.DND_BACKLOGID,
    labelID: {
      bug: "66c100d0dc148a7772a2a87f",
      spike: "66c100d01ac2bc4b519b60a1",
      task: "66c100d04c8149ad4e5fcde0",
      fe: "66c100d18a731728c9abcc5a",
      be: "66c100cfdcbc2fdfa7374660",
    },
  },
  mtg: {
    boardID: process.env.MTG_BACKLOGID,
    labelID: {
      bug: "636064dc1c38c7538d525d52",
      spike: "636064dc1c38c7538d525d56",
      task: "636064dc1c38c7538d525d4e",
      fe: "636064dc1c38c7538d525d57",
      be: "636064dc1c38c7538d525d50",
    },
  },
};

exports.boardInfo = boardInfo;
