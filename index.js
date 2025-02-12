import fetch from "node-fetch";

class mutualFundsInfo {
  navURL = "https://www.amfiindia.com/spages/NAVAll.txt"; // URL to fetch NAV data

  // Method to get information about the package
  about() {
    return "mutualfund-info - NPM Package to get the NAVs of Mutual Funds in India.";
  }

  // Method to fetch all NAVs
  async getAllNavs() {
    return new Promise((resolve, reject) => {
      fetchNavs(this.navURL).then(
        (result) => {
          resolve(prepareNavsArray(result)); // Process and resolve the fetched data
        },
        (reason) => {
          reject(reason); // Reject in case of an error
        }
      );
    });
  }

  // Method to fetch NAV by scheme code
  async fetchNavBySchemeCode(schemeCode) {
    const navs = await this.getAllNavs();
    return navs.filter((nav) =>
      nav["Scheme Code"].toLowerCase().includes(schemeCode.toLowerCase())
    );
  }

  // Method to fetch NAV by scheme name
  async fetchNavBySchemeName(schemeName) {
    const navs = await this.getAllNavs();
    return navs.filter((nav) =>
      nav["Scheme Name"].toLowerCase().includes(schemeName.toLowerCase())
    );
  }
}

// Function to check if the fetched text contains an error
const isError = (txt) =>
  txt.includes("Internal Server Error") ||
  !txt.split("\n")[0].toLowerCase().includes("scheme");

/**
 * Method to fetch NAV data from the URL
 * Given a URL, this function fetches the data from the given URL.
 * It resolves with the fetched data if there is no error.
 * Otherwise, it rejects with an error message.
 * @param {string} url - URL to fetch data from
 * @returns {Promise<string>}
 */
const fetchNavs = (url) =>
  new Promise((resolve, reject) => {
    fetch(url).then(
      (result) => {
        result.text().then(
          (result) => {
            if (isError(result))
              reject("Error in fetching NAVs."); // Check for errors
            else resolve(result); // Resolve the fetched text
          },
          (reason) => {
            reject(reason); // Reject in case of an error
          }
        );
      },
      (reason) => {
        reject(reason); // Reject in case of an error
      }
    );
  });

/**
 * Given a text fetched from the NAV URL, this function
 * returns an array of objects. Each object represents
 * a mutual fund and contains its details.
 * @param {string} txt - the text fetched from the NAV URL
 * @returns {array} an array of objects, each representing a mutual fund
 */
const prepareNavsArray = (txt) => {
  // Removes blank lines from the given text.
  const removeBlankLines = (txt) =>
    txt.replace(/(\n{2,})/gm, "\n").replace(/(\r)/gm, "");
  const isDataRow = (row) => row.split(";").length == headers.length;

  const rows = removeBlankLines(txt)
    .split("\n")
    .filter((el) => el.length > 1);
  const headers = rows.shift().split(";");

  const arr = [];
  var schemeType = "";
  var amcName = "";

  for (var i = 0; i < rows.length; ++i) {
    const row = rows[i];
    // check if the row is a data row
    if (isDataRow(row)) {
      const attr = row.split(";");
      const data = {};
      for (var j = 0; j < attr.length; ++j) {
        data[headers[j]] = attr[j];
      }
      data["AMC Name"] = amcName;
      data["Scheme Type"] = schemeType;
      arr.push(data);
    } else if (isDataRow(rows[i + 1])) {
      // else this will be the AMC Name Row
      amcName = row; // Set AMC Name
    } else {
      // else this will be the Scheme Type Row
      schemeType = row; // Set Scheme Type
    }
  }
  return arr;
};

export default mutualFundsInfo;
