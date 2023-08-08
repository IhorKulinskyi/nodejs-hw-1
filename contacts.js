const { program } = require("commander");

const contacts = require("./db");

const invokeAction = async ({ action, id, phone, email, name }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      return console.log(allContacts);

    case "get":
      const contact = await contacts.getContactById(id);
      return console.log(contact);

    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      return console.log(newContact);

    case "remove":
      const removedContact = await contacts.removeContact(id);
      return console.log(removedContact);

    case "update":
      const updContact = await contacts.updateContact(id, {
        name,
        email,
        phone,
      });
      return console.log(updContact);

    default:
      console.warn("unknown action type!");
  }
};

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

invokeAction(options);
