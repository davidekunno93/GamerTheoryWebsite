import App from "./App"
import DataProvider from "./Context/DataProvider"


export const ProviderLayer = () => {
  return (
    <DataProvider>
        <App />
    </DataProvider>
  )
}
export default ProviderLayer;
