import APP from "./firebase_app";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";

const FIRESTORE_DATABSE = getFirestore(APP);

async function setOBJ(collectionName)
{
  const DATABASE_DATA = await getDocs( collection( FIRESTORE_DATABSE, collectionName))
  return DATABASE_DATA.docs.map(
                                (item) => ( {
                                             id: item.id,
                                             ...item.data()
                                           }
                                          )
                              );
}

export async function getGeneralsList(collectionName)
 {
  const JSON_OBJ = await setOBJ(collectionName)
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

export async function getIdList(collectionName) 
{
  const JSON_OBJ = await setOBJ(collectionName)
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

export async function getPerson(idRequested,collectionName)
{ 
  
  const JSON_OBJ = await setOBJ(collectionName)
  const SELECTED_PERSON = JSON_OBJ.filter(
    function(obj) 
    {
      return obj.id.toString() === idRequested;
    }
  );
  if (SELECTED_PERSON.length > 0)
  {
    const TOURS_OBJ = await setOBJ("tours")
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