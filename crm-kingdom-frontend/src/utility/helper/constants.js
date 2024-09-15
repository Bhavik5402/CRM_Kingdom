export const Constants = {
    AppTokenKey: "app_token",
    UserDetails: "user_details",
    MenuDetails: "menu_details",
    LocalAppEncryptkey: "Bhavik_Parmar",
};

export const UserAccess = {
    STAGES: { id: 1, label: "Stages" },
    ADD_STAGE: { id: 2, label: "Add Stage" },
    LEAD: { id: 3, label: "Lead" },
    LEAD_PROCESSING: { id: 4, label: "Lead Processing" },
};

export const rowsPerPageOptions = [5, 10, 15, 20];

export const centerStyle = {
    textAlign: "center",
};

export const headers = {
    fontWeight: "bold",
    fontSize: "16px",
    textAlign: "center",
};

export const successErrorModalStyle = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 300,
	borderRadius: "10px",
	bgcolor: "background.paper",
	padding: "76px 74px 70px",
	textAlign: "center",
	"@media (max-width:599px)": {
		width: "calc(100% - 30px)",
		padding: "30px",
	},
};

export const PhoneNumberRegex = /^\d{10}$/;