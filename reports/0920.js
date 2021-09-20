class ObjectUtilities {
    /* Your magic here */
    static mergeObjects = (A, B) => ({ ...A, ...B });
    static removePassword = ({password, ...rest}) => rest;
    static freezeObj = user => Object.freeze(user);
    static getOnlyValues = user => Object.values(user);
    static getOnlyProperties = user => Object.keys(user);
  }
  
  const objA = {
    name: "Nicolas",
    favFood: "Kimchi"
  };
  
  const objB = {
    password: "12345"
  };
  
  const user = ObjectUtilities.mergeObjects(objA, objB);
  console.log(user);
  
  const cleanUser = ObjectUtilities.removePassword(user);
  console.log(cleanUser);
  
  const frozenUser = ObjectUtilities.freezeObj(cleanUser);
  
  const onlyValues = ObjectUtilities.getOnlyValues(frozenUser);
  console.log(onlyValues);
  
  const onlyProperties = ObjectUtilities.getOnlyProperties(frozenUser);
  console.log(onlyProperties);
  
  frozenUser.name = "Hello!"; // This should show an error
  