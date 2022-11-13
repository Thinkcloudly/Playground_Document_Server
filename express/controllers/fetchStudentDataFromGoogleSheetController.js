const { fetchGoogleSheetData } = require("../services/GoogleSheetApis");

const fetchStudentDataFromGoogleSheetController = async (req, res) => {
  try {
    // const spreadsheetId = '1Z1YOITDrdFO9GsyCIKbo41tMwzM1rUOxJ9HuTJ-DRAE';
    // const range = "Sheet1";
    const { spreadsheetId, range, studentEmail } = req.query;
    const result = await fetchGoogleSheetData(spreadsheetId, range);
    const response = [result.values[0]];
    result.values.forEach(arr => {if (arr[1] === studentEmail) response.push(arr)})
    res.status(200).json(response);
  } catch (e) {
    console.error(e);
    res.status(500).json({ e });
  }
};

module.exports = fetchStudentDataFromGoogleSheetController;
