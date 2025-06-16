import CriteriaSummary from "~/components/criteria-info";
import Header from "~/components/Header";

function Scales() {
    return (<>
        <Header endpoint="Skala Penilaian" ></Header>
        <div className="p-4">
            <CriteriaSummary></CriteriaSummary>
        </div>
    </>);
}

export default Scales;