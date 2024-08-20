// const apiUrl = "http://localhost:2000";

// export const api = async (req, res) => {
//   try {
//     const response = await fetch(apiUrl);

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();
//     res.json(data);
//   } catch (error) {
//     console.error("Erro ao buscar dados:", error);
//     res.status(500).send({ error: "Erro ao buscar dados" });
//   }
// };
