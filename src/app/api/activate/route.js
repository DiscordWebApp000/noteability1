import { db } from "../../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export async function POST(request) {
  const data = await request.json();
  const { email, password } = data;

  console.log("Attempting to save data to Firebase...", { email, password });

  try {
    // Verileri Firestore'daki 'activations' koleksiyonuna ekle
    const docRef = await addDoc(collection(db, "activations"), {
      email: email,
      password: password, // Gerçek uygulamada şifreleri doğrudan kaydetmek yerine hashlemelisiniz!
      timestamp: new Date(),
    });

    console.log("Document written with ID: ", docRef.id);
    return new Response(JSON.stringify({ message: "Activation successful! Data saved to Firebase." }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.error("Error adding document to Firestore: ", e);
    return new Response(JSON.stringify({ message: "Aktivasyon başarısız oldu! Sunucu hatası." + e.message, error: e.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
} 