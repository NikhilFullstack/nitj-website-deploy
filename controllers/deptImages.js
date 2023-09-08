const Images = require("../models/deptImages");

const getAllDeptImages = async (req, res) => {
    try {
        const result = await Images.find({ show: true },).sort({order:1});
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const getByIdDeptImages = async (req, res) => {
    try {
        const result = await Images.find({ _id: req.params.id });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const getByDeptDeptImages = async (req, res) => {
    try {
        const result = await Images.findOne({ show: true, department: req.params.dept });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const addImageDescById = async (req,res) => {
    try{
        const {description} = req.body;
        if(!description || description === ""){
            return res.status(401).json({
                success:false,
                message:'Please Provide description to the Image',
            });
        }
        const handle = await Images.findByIdAndUpdate({ _id: req.params.id }, { $set: { desc: description } }, { new: true });
        return res.status(200).json({
            success:true,
            message:"Description updated",
        })

    }
    catch(err){
        return response.status(500).json({
            success:false,
            message:err.message,
        });
    }
}
module.exports = {getAllDeptImages,getByDeptDeptImages,getByIdDeptImages,addImageDescById};