const Question = require('../Model/Question'); // Assuming you have a Question model
const Response = require('../Model/responseSchema ');



const getQuestionsByCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId; // Use the courseId from request parameters
    const questions = await Question.find({ courseId }); // Query with the courseId

    if (!questions) {
      return res.status(404).json({ message: 'No questions found for this course' });
    }

    // Format the questions with required details
    const formattedQuestions = questions.map(question => ({
      _id: question._id,
      questionText: question.questionText,
      questionType: question.answerType,
      options: question.options.map(opt => opt.optionText), // Extract option text
    }));

    res.json(formattedQuestions); // Send formatted questions back to the client
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ message: 'Error fetching questions' });
  }
};

// Get questions for a specific course (same questions every day)
const getQuestions = async (req, res) => {
  try {
    const { courseId } = req.params;
    const questions = await Question.find({ courseId }); // Always fetch the same questions for the course

    if (!questions.length) {
      return res.status(404).json({ message: 'No questions found for this course.' });
    }

    res.status(200).json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ message: 'Error fetching questions' });
  }
};

const submitResponses = async (req, res) => {
  const { courseId } = req.params; // Extract courseId from params
  const { responses, studentId, date } = req.body; // Get responses, studentId, and date from the request body
  console.log("submit-ressponse : ",studentId, courseId, date); // Log for debugging

  try {
    // Log the incoming responses to check the structure
    console.log('Received responses:', responses);

    // Check if responses exist and are in the correct format
    if (!Array.isArray(responses) || responses.length === 0) {
      return res.status(400).json({ message: 'No responses provided or invalid format.' });
    }

    // Find the existing response document for the given course and student
    let responseDoc = await Response.findOne({ courseId, studentId });

    if (!responseDoc) {
      // If no document exists, create a new one
      responseDoc = new Response({
        courseId,
        studentId,
        responses: [], // Initialize the responses as an empty array
        submissionDate: new Date(), // Set the overall submission date
      });
    }

    // Loop through the new responses and append to the responses array
    responses.forEach((newResponse) => {
      // Check if all required fields are present in the new response
      if (!newResponse.questionText || !newResponse.answerType || typeof newResponse.answer === 'undefined') {
        throw new Error('Missing required fields in one or more responses.');
      }

      // Ensure `date` is provided for each response, or set it to the current date if not provided
      const responseDate = newResponse.date || new Date();  // Use the date provided or default to the current date

      // Push the new response to the responses array with the custom `date` for each response
      responseDoc.responses.push({
        questionText: newResponse.questionText,
        answerType: newResponse.answerType,
        answer: newResponse.answer,
        responseDate: date, // Set the date for each individual response
      });
    });

    // Save the updated document
    const result = await responseDoc.save();
    console.log(result);

    res.status(200).json({ message: 'Responses stored successfully!' });
  } catch (error) {
    console.error('Error storing responses:', error);
    res.status(500).json({ message: 'Error storing responses', error: error.message });
  }
};




module.exports = {

  getQuestionsByCourse,

  getQuestions,
  submitResponses,
};
