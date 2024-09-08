import Breadcrumbs from "components/Common/BreadCrumb";
import LeadDetails from "components/Lead/LeadDetails";
import { SuccessErrorModalDispatchContext } from "Context/AlertContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import leadService from "services/lead-service";
import { createCommonApiCall } from "utility/helper/create-api-call";

function ViewLead() {
    // url params
    const { leadId } = useParams();

    // state variables
    const [breadcrumbRoute, setBreadcrumbRoute] = useState(["home", "leads", "view"]);
    const setSuccessErrorContext = useContext(SuccessErrorModalDispatchContext);
    const [formData, setFormData] = useState({
        companyname: "",
        email: "",
        phonenumber: "",
        whatsappnumber: "",
        website: "",
        countryid: "",
        stateid: "",
        cityid: "",
        address: "",
        managerusername: "",
        manageremailid: "",
        managerphonenumber: "",
        managerwhatsappnumber: "",
        instagram: "",
        facebook: "",
        linkedin: "",
        history: [
            // {
            //     username: "Me",
            //     previouseStage: null,
            //     newState: "Current",
            //     dateChanged: "24/11/2002",
            // },
            // {
            //     username: "Me2",
            //     previouseStage: "Current",
            //     newState: "Current new",
            //     dateChanged: "24/11/2004",
            // },
            // {
            //     username: "Me3",
            //     previouseStage: "Current new",
            //     newState: "Finish",
            //     dateChanged: "24/11/2005",
            // },
        ],
    });
    const [pageTitle, setPageTitle] = useState("View Lead");

    // handle events and functions
    const getLeadDetails = async () => {
        console.log(leadId);

        const data = await createCommonApiCall({
            requestBody: { leadId },
            apiService: leadService.GetLeadById, // Assume this is the API to get stage by ID
            setSuccessErrorContext,
            showPopup: false,
        });

        if (data && data.isSuccessfull) {
            console.log(data);
            setFormData({
                ...data.data,
                history: data.data.history.map((value) => {
                    return {
                        ...value,
                        dateChanged: new Date(value.dateChanged),
                    };
                }),
            });
        }
    };

    // use effects
    useEffect(() => {
        getLeadDetails();
    }, []);

    return (
        <div className="lead-page">
            <Breadcrumbs icon="home" title={pageTitle} route={breadcrumbRoute} light={false} />
            <LeadDetails data={formData} />
        </div>
    );
}

export default ViewLead;
