import userModel from "../modals/user.model.js";

export const deleteuser = (req,res)=>{
    res.send("the response")
}

export const BecomeSeller = async (req, res) => {
    try {
      const { id, country, description } = req.body;
      const updatedProfile = await userModel.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            isSeller: true,
            country: country,
            desc: description,
          },
        },
        { new: true }
      );
  
      if (updatedProfile) {
        return res.status(200).json({ updated: true, user: updatedProfile });
      } else {
        console.log('There is some error');
        // return res.status(500).json({ updated: false, error: 'Update failed' });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ updated: false, error: 'Server error' });
    }
  };
  

