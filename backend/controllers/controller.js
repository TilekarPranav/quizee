import Questions from "../models/questionSchema.js";
import Results from "../models/resultSchema.js";
import questionsData, { answers } from '../database/data.js';

/** get all questions */
export async function getQuestions(req, res) {
    try {
        const dbQuestions = await Questions.find();
        const questions = dbQuestions.length > 0 
            ? dbQuestions.map(q => ({ question: q.question, options: q.options }))
            : questionsData;
        res.json([{ questions, answers }]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/** insert all questions */
export async function insertQuestions(req, res){
    try {
        const mappedQuestions = questionsData.map((q, i) => ({
            question: q.question,
            options: q.options,
            answer: answers[i]
        }));

        await Questions.insertMany(mappedQuestions);
        res.json({ msg: "Questions Saved Successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/** delete all questions */
export async function dropQuestions(req, res){
    try {
        await Questions.deleteMany();
        res.json({ msg: "Questions Deleted Successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/** get all results */
export async function getResult(req, res){
    try {
        const r = await Results.find();
        res.json(r);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/** post result */
export async function storeResult(req, res){
    try {
        const { username, result, attempts, points, achived } = req.body;
        if(!username || !result) throw new Error('Data Not Provided!');
        await Results.create({ username, result, attempts, points, achived });
        res.json({ msg: "Result Saved Successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/** delete all results */
export async function dropResult(req, res){
    try {
        await Results.deleteMany();
        res.json({ msg: "Result Deleted Successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
