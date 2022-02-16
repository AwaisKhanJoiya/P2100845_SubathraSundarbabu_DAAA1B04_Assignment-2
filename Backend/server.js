const app = require("./controller/app");

const PORT = 3000;
app.listen(PORT, () => {
    // console.log(`Server started on port ${PORT}`);
    console.log(`Backend server at port ${PORT}`);
});