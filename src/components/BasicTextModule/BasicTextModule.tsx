import React from "react"
import { BasicTextModuleStyles } from "./BasicTextModuleStyles"

const BasicTextModule = ({ title, subtitle, children }) => {

    return (
        <BasicTextModuleStyles>
            <div className="container">
                <h2>{ title }</h2>
                <p style={{ marginBottom: "60px" }}>{ subtitle }</p>
                {children ?? <p></p>}
            </div>
        </BasicTextModuleStyles>
    )
}

export default BasicTextModule
