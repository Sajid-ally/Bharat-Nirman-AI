import {
doc,
deleteDoc
}
from "firebase/firestore";

import {
db
}
from "./firebase";

export async function
deleteReport(id){

await deleteDoc(
doc(
db,
"reports",
id
)
);

}