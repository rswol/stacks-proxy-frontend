let apiEndpoint;
apiEndpoint = process.env.REACT_APP_BACKEND || "http://localhost:8088/";
console.log("API backend " + apiEndpoint);
export { apiEndpoint };
