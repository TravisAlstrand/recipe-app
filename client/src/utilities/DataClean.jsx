// TO PREP FOR DATABASE

export function cleanIngredients(ingredients) {
  const trimmedIngredients = [...ingredients];
  trimmedIngredients.forEach((ingredient) => {
    ingredient.forEach((section, index) => {
      let trimmed = section.trim();
      if (trimmed.includes(' ')) {
        trimmed = trimmed.replace(/\s+/g, '-');
      };
      ingredient[index] = trimmed;
    });
  });
  return trimmedIngredients;
};

export function cleanFormData(form, ingredients, directions) {
  // recipe name
  let body = {};
  body.recipeName = form.name.value;
  // recipe type
  const type = form.type.value;
  if (type === form.type.options[0].value)
    body.type = '';
  else {
    body.type = type;
  };
  // recipe difficulty
  const diff = form.difficulty.value;
  if (diff === form.difficulty.options[0].value) {
    body.difficulty = '';
  } else {
    body.difficulty = diff;
  };
  // slow cooker
  if (form.yesSlow.checked === true) {
    body.isSlowCooker = 'TRUE'
  } else if (form.noSlow.checked === true) {
    body.isSlowCooker = 'FALSE'
  } else {
    body.isSlowCooker = '';
  };
  // ingredients
  if (ingredients.length) {
    const newIngredients = ingredients.map(ingredient => {
      return ingredient.join(' ');
    });
    body.ingredients = `* ${newIngredients.join(' \n* ')}`;
  } else {
    body.ingredients = '';
  };
  // directions
  if (directions.length) {
    body.directions = `* ${directions.join(' \n* ')}`;
  } else {
    body.directions = '';
  };
  // prep time
  let prepString = form.prepTime.value;
  const prepUnit = form.prepTimeUnit.value;
  if (prepUnit !== form.prepTimeUnit.options[0].value) {
    prepString += ` ${prepUnit}`;
  };
  body.prepTime = prepString;
  // cook time
  let cookString = form.cookTime.value;
  const cookUnit = form.cookTimeUnit.value;
  if (cookUnit !== form.cookTimeUnit.options[0].value) {
    cookString += ` ${cookUnit}`;
  };
  body.cookTime = cookString;
  return body;
};

export function splitString(stringToSplit, keyString) {
  if (keyString === 'prep/cook') {
    return stringToSplit.split(' ');
  } else {
    const stringArray = stringToSplit.split('* ');
    let newArray = [];
    stringArray.forEach(string => {
      if (string.includes('\n')) {
        let newString = string.trim();
        newArray.push(newString);
      } else {
        newArray.push(string);
      };
    });
    if (newArray[0] === '') {
      newArray.splice(0, 1);
    };
    // remove 1st empty array item
    if (keyString === 'ingredients') {
      newArray = newArray.map(string => {
        return string.split(' ');
      });
      // replace hyphens with spaces
      newArray.forEach(ingredient => {
        ingredient.forEach((section, index) => {
          if (section.includes('-')) {
            ingredient[index] = hypToSpace(section);
          };
        });
      });
    };
    return newArray;
  };
};

export function hypToSpace(string) {
  return string.replace(/-/g, ' ');
};
