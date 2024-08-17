import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Breadcrumbs as MuiBreadcrumbs, Typography } from "@mui/material";
import Icon from "@mui/material/Icon";

const Breadcrumbs = ({ icon, title, route, light }) => {
    const routes = route.slice(0, -1);
    console.log("Routes - ",routes);
    return (
        <div style={{ marginRight: light ? 8 : 0 }}>
            <MuiBreadcrumbs
                sx={{
                    "& .MuiBreadcrumbs-separator": {
                        color: (theme) => (light ? theme.palette.common.white : theme.palette.grey[600]),
                    },
                }}
            >
        
                {routes.map((el) => (
                    <Link to={`/${el}`} key={el}>
                        <Typography
                            component="span"
                            variant="button"
                            color={light ? "white" : "textPrimary"}
                            sx={{ textTransform: "capitalize", opacity: light ? 0.8 : 0.5 }}
                        >
                            {el.replace("-", " ")}
                        </Typography>
                    </Link>
                ))}
                <Typography
                    variant="button"
                    color={light ? "white" : "textPrimary"}
                    sx={{ textTransform: "capitalize" }}
                >
                    {title.replace("-", " ")}
                </Typography>
            </MuiBreadcrumbs>


            {/* uncommnet below code to display the current path as title */}
            
            {/* <Typography
                variant="h6"
                fontWeight="bold"
                color={light ? "white" : "textPrimary"}
                sx={{ textTransform: "capitalize" }}
                noWrap
            >
                {title.replace("-", " ")}
            </Typography> */}
        </div>
    );
};

// Setting default values for the props of Breadcrumbs
Breadcrumbs.defaultProps = {
    light: false,
};

// Typechecking props for the Breadcrumbs
Breadcrumbs.propTypes = {
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    route: PropTypes.array.isRequired,
    light: PropTypes.bool,
};

export default Breadcrumbs;
