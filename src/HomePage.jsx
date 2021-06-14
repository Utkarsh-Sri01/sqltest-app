import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "./App";

function HomePage({ email }) {
  const [tableData, setTableData] = useState(null);
  const [query, setQuery] = useState("");
  const [queryResult, setQueryResult] = useState({ isError: false, data: [] });
  const [submitStatus, setSubmitStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(API_BASE_URL + "/submitTest", {
        query: query,
        userEmailId: email,
      });
      setSubmitStatus({ isError: false, msg: response.data.data });
    } catch (error) {
      setSubmitStatus({ isError: true, msg: error.response.data.message });
    }
  };

  const executeQuery = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(API_BASE_URL + "/executeQuery", {
        query,
      });
      setQueryResult({
        isError: false,
        data: response.data.data,
        isOutPutMatches: response.data.isOutPutMatches,
      });
      console.log(email);
    } catch (error) {
      setQueryResult({
        isError: true,
        data: null,
        errorMessage: error.response.data.message,
      });
    }
  };

  useEffect(() => {
    async function fetchTableData() {
      try {
        let response = await axios.get(API_BASE_URL + "/startTest");
        setTableData(response.data);
      } catch (error) {
        console.log(error);
        setTableData(null);
      }
    }
    fetchTableData();
  }, []);

  return tableData ? (
    <div>
      {tableData.tables.map((table) => (
        <>
                    <h3 className="table-schema-label">{table.tableName}</h3>   
               
          <table className="table-container">
                       
            <tbody>
                           
              {table.data.map((row) => (
                <tr key={row.name}>
                                    <td className="column-table">{row.name}</td>
                                    <td className="column-table">{row.type}</td>
                                   
                  <td className="column-table">
                                       
                    {row.nullable === "YES" ? "nullable" : "not null"}         
                           
                  </td>
                                 
                </tr>
              ))}
                         
            </tbody>
                     
          </table>
                 
        </>
      ))}
           
      <div className="question-label">
                <p className="question-heading">Question</p>       
        <div>{tableData.questions[0].question_desc}</div>     
      </div>
           
      <form onSubmit={handleSubmit}>
               
        <textarea
          type="email"
          value={query}
          className="text-area"
          placeholder="Type your sql query"
          onChange={({ target }) => setQuery(target.value)}
        />
               
        {!queryResult.isError && queryResult.data.length > 0 && (
          <>
                       
            {queryResult.isOutPutMatches ? (
              <p class="success-message">
                                Your result matches with expected ouput        
                     
              </p>
            ) : (
              <p class="error-message">
                                Your result does not matches with expected ouput
                             
              </p>
            )}
                       
            <div className="question-label">
                            <p className="question-heading">Query Results</p>   
                       
              <table className="table-container">
                               
                <tbody>
                                   
                  {queryResult.data.map((row, index) => (
                    <tr key={index}>
                                           
                      {Object.keys(row).map((col) => (
                        <td className="column-table">{row[col]}</td>
                      ))}
                                         
                    </tr>
                  ))}
                                 
                </tbody>
                             
              </table>
                         
            </div>
                     
          </>
        )}
               
        {queryResult.isError && (
          <p className="error-message">
                       {" "}
            {queryResult.errorMessage ||
              "Some Error Occured while fetching the query"}{" "}
                     
          </p>
        )}
        {submitStatus.isError === false ? (
          <p class="success-message">
                            {submitStatus.msg}              
          </p>
        ) : (
          <p class="error-message">
                          {submitStatus.msg}                  
          </p>
        )}
        <div className="button-container">
                   
          <button
            disabled={query ? false : true}
            className="button-styled"
            onClick={executeQuery}
          >
                        Execute Query          
          </button>
                   
          <button
            className="button-styled"
            disabled={(query ? false : true) || submitStatus.isError === false}
            type="button"
            onClick={handleSubmit}
          >
                        Submit          
          </button>
                 
        </div>
             
      </form>
         
    </div>
  ) : (
    <div>Some Error occcured</div>
  );
}

export default HomePage;
