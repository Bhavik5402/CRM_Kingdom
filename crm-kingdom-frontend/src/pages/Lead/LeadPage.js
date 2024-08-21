
import Breadcrumbs from 'components/common/BreadCrumb'
import LeadCreationForm from 'components/Lead/LeadCreationForm'
import {React,useState} from 'react'

export default function LeadPage() {

    const onSave = (values) => {
        console.log(values)
    }

    const onCancel = () => {
        console.log("cancle")
    }

    const [breadcrumbRoute, setBreadcrumbRoute] = useState(["home","Add Lead"]);
    const [pageTitle, setPageTitle] = useState("Add Lead");

    return (
        <div className='lead-page'>
            <Breadcrumbs icon="home" title={pageTitle} route={breadcrumbRoute} light={false} />

            <LeadCreationForm onSave={onSave} onCancel={onCancel} />
        </div>
    )
}
