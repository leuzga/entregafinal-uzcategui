import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../components/services/FirebaseConfig'
export default async function ServiceJson(): Promise<any> {
  
  let data: any[] = [];
  const querySnapshot = await getDocs(collection(db, 'products_FS'));

  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  })

  return data;
}
