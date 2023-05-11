const Contact = require("../models/contact");

// Define controller functions
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    console.log("contacts", contacts);
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const createContact = async (req, res) => {
  // Contact.create(req.body)
  //   .then((data) => res.json({ message: "Todo added successfully", data }))
  //   .catch((err) =>
  //     res
  //       .status(400)
  //       .json({ message: "Failed to add todo", error: err.message })
  //   );
  try {
    const { name, email, message } = req.body;
    const doc = await Contact.create({ name, email, message });
    await doc.save();
    res.status(201).json(doc);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, message } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      id,
      { name, email, message },
      { new: true }
    );
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndRemove(id);
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getAllContacts,
  createContact,
  getContactById,
  updateContact,
  deleteContact,
};
// try {
//   const { name, email, message } = req.body;
//   // const contact = new Contact({ name, email, message });
//   const doc = await Contact.create({ name, email, message });
//   await doc.save();
//   res.status(201).json(doc);
// } catch (error) {
//   res.status(500).json({ error: "Server error" });
// }
