const SoloGame = require('../models/SoloGame'); 

const startSoloGame = async (req, res) => {
  try {
    const { category , quizzes } = req.body;
    const userId = req.user.id;

    const newSoloGame = new SoloGame({
      category,
      score: 0,
      quizzes, 
      userId,
    });

    await newSoloGame.save();
    return res.status(201).json({
      success: true,
      newSoloGame,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

const endSoloGame = async (req, res) => {
  
  try {
    const { score, quizzes } = req.body;

    const updatedSoloGame = await SoloGame.findByIdAndUpdate(
      req.soloGameId,
      {
        score,
        quizzes,
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      game: updatedSoloGame,
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  startSoloGame,
  endSoloGame
}
