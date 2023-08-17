import userModel from "../modals/user.model.js";
import postModel from "../modals/post.model.js";
import proposalModel from "../modals/proposal.modal.js";
import categoryModel from "../modals/category.model.js";
import chatModel from "../modals/chat.model.js";
import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51NUpC6SHhgXv6TRctUlfjdoCbOpHJooAQ3GgH2mpIjZkyQssWGZtelYDEVOgSOABVTeFkqZnJi5vPcr8yGAHG1dv00wWCyDJou"
);

export const deleteuser = (req, res) => {
  res.send("the response");
};

export const BecomeSeller = async (req, res) => {
  try {
    const id = req.userId;
    const updatedProfile = await userModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          isSeller: true,
          ...req.body,
        },
      },
      { new: true }
    );

    if (updatedProfile) {
      return res.status(200).json({ updated: true, user: updatedProfile });
    } else {
      console.log("There is some error");
      // return res.status(500).json({ updated: false, error: 'Update failed' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ updated: false, error: "Server error" });
  }
};

export const SingleGig = async (req, res) => {
  const id = req.params.id;
  const gig = await postModel.findOne({ _id: id }).populate("userId");
  return res.status(200).json({ gig });
};

export const newPropsal = async (req, res) => {
  try {
    const newProposal = new proposalModel({
      buyerId: req.userId,
      sellerId: req.sellerId,
      ...req.body,
    });

    let proposal = await newProposal
      .save()
      .then(console.log("proposal created"));
  } catch (error) {}
};

export const myproposal = async (req, res) => {
  try {
    const id = req.userId;
    const proposal = await proposalModel
      .find({ buyerId: id })
      .populate("sellerId");
    return res.status(200).json({ proposal });
  } catch (error) {}
};

export const Ongoing = async (req, res) => {
  try {
    const id = req.userId;
    const proposal = await proposalModel
      .find({ buyerId: id, status: "ongoing" })
      .populate("sellerId");
    return res.status(200).json({ proposal });
  } catch (error) {}
};

export const categoryfilter = async (req, res) => {
  try {
    const category = await categoryModel.findById(req.params.id);
    const { title } = category;

    const allpost = await postModel.find({ cat: title }).populate("userId");
    console.log(allpost);
    return res.status(200).json({ allpost });
  } catch (error) {}
};



export const payment = async (req, res) => {
  console.log("payment function");
  const stripe = new Stripe(
    "sk_test_51NdqznSGqo6y3mFMGrrPnHxQGosfEFn1hvalkVIEzlHUPGSXJWIRsx9c8H6io4HFPd8FbhVx6T2dbhd9RMLsTAK600ObAT9Nzp"
  );

  const gig = await postModel.findById(req.params.id);
  const price = gig.price;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: price*100,
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  console.log(paymentIntent);

  res.status(200).json({
    clientSecret: paymentIntent.client_secret
  })
};






// export const payment = async (req,res) => {
//   try {
//     const { detail } = req.body;

//     const gig = await postModel.findById(detail);
//     if (!gig) {
//       return res.status(404).json({ error: 'Gig not found' });
//     }else{

//     const price = gig.price;
// console.log(price);
//     let session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [
//         {
//           price_data: {
//             currency: 'inr',
//             product_data: {
//               name: 'Product Name', // Set your product name here
//             },
//             unit_amount: price * 100,
//           },
//           quantity: 1,
//         },
//       ],
//       mode: 'payment',
//       success_url: `${process.env.USER_REQUEST}/users/profile`, // Redirect URL after successful payment
//       cancel_url: `${process.env.USER_REQUEST}/users/profile`, // Redirect URL after cancelled payment
//     });

//     return res.status(200).json({ sessionId: session.id });
//   }
//   } catch (error) {
//     console.error('Payment error:', error);
//     return res.status(500).json({ error: 'Payment error' });
//   }
// }


export const getChat = async(req,res)=>{
  try {
    console.log(req.userId);
    console.log(req.params.id);
    const allchat =  chatModel.find()
  } catch (error) {
    
  }
}

export const addMessage = async (req, res) => {
  try {
    const { from, to, msg } = req.body;
    const data = await chatModel.create({
      message: { text: msg },
      users: [from, to],
      sender: from,
    });
    if (data) {
      return res.json({ msg: "Message added successfully" });
    }
    return res.json({ msg: "Failed to add message" });
  } catch (error) {
    console.error(error);
    // return res.status(500).json({ msg: "Internal server error" });
  }
};

export const getAllMessages = async (req, res) => {
  try {
    const { to, from } = req.query;
    const messages = await chatModel.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });
    const formattedMessages = messages.map((msg) => {
      const now = new Date();
      const timeAgo = Math.floor((now - new Date(msg.updatedAt)) / 60000); // Calculate time difference in minutes

      let timeString;
      if (timeAgo <= 0) {
        timeString = "just now";
      } else if (timeAgo === 1) {
        timeString = "1 minute ago";
      } else if (timeAgo < 60) {
        timeString = `${timeAgo} minutes ago`;
      } else if (timeAgo < 1440) {
        const updatedTime = new Date(msg.updatedAt).toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        });
        timeString = updatedTime.includes(":")
          ? updatedTime.replace(" ", "")
          : updatedTime;
      } else {
        const updatedTime = new Date(msg.updatedAt).toLocaleString([], {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
        timeString = updatedTime.includes(",")
          ? updatedTime.replace(",", "")
          : updatedTime;
      }

      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
        time: timeString,
      };
    });

    res.status(200).json({ messages: formattedMessages });
  } catch (e) {
    console.log(error.message);
    // return res.status(500).json({ error });
  }
};


export const senderDetails = async (req, res) => {
  try {
    const { senderId } = req.query;
    const senderDetails = await userModel.findOne({ _id: senderId });
    res.json({ senderDetails });
  } catch (error) {
    console.log(error.message);
    // return res.status(500).json({ error });
  }
};