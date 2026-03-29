export async function detectWaste(image: File) {
  const formData = new FormData();
  formData.append("image", image);

  const res = await fetch("http://localhost:5000/detect", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  console.log("AI CAPTION:", data);

  return data;
}