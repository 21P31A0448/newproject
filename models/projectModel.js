const mongoose=require('mongoose')
const projectSchema=new mongoose.Schema({
    projecttitle: {
        type: String,
        required: true
      },
      projectdescription: {
        type: String,
        required: true
      },
      projectrequirement: {
        type: String,
        required: true
      },
      deadline: {
        type: Date,
        required: true
      }
})


const projectModel=mongoose.model('addproject',projectSchema)
module.exports=projectModel


