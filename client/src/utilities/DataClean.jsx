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
    body.ingredients = `* ${ingredients.join(' \n* ')}`;
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