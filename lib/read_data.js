import fs from 'fs';
import path from 'path';

function setOBJ(jsonFile)
{
  const DATA_DIR = path.join( process.cwd(), 'data' );
  const PATH = path.join(DATA_DIR, jsonFile);
  const STRING = fs.readFileSync(PATH,'utf8');
  return JSON.parse(STRING);
}

export function getGeneralsList(jsonFile)
 {
  const JSON_OBJ = setOBJ(jsonFile)
  JSON_OBJ.sort(
    function(personCompareOne,personCompareTwo)
    {
      return personCompareOne.name.localeCompare(personCompareTwo.name);
    }
  );

  return JSON_OBJ.map(
    function(persons) 
    {
      return {
        id: persons.id.toString(),
        name: persons.name
      };
    }
  );
}

export function getIdList(jsonFile) 
{
  const JSON_OBJ = setOBJ(jsonFile)
  return JSON_OBJ.map(
    function(persons)
     {
      return {
        params: {
          id: persons.id.toString()
        }
      };
    }
  );  
}

export async function getPerson(idRequested,jsonFile)
{ 
  
  const JSON_OBJ = setOBJ(jsonFile)
  const SELECTED_PERSON = JSON_OBJ.filter(
    function(obj) 
    {
      return obj.id.toString() === idRequested;
    }
  );
  if (SELECTED_PERSON.length > 0)
  {
    const TOURS_OBJ = setOBJ("tours.json")
    const SELECTED_PERSON_TOURS = TOURS_OBJ.filter(
      function(obj) 
      {
        return obj.lieutenant_id_foreign_key.toString() === idRequested;
      }
    );
    let combinedPersonData = SELECTED_PERSON[0]
    combinedPersonData.tours = SELECTED_PERSON_TOURS
    return combinedPersonData;
  } 
    return {};
}