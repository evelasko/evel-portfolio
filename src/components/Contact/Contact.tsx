import React from "react"
import { ContactStyles } from "./ContactStyles"

const Contact = () => {
    return (
        <ContactStyles>
            <form name="contact">
                <input placeholder="Nombre" type="text" name="name" />
                <input placeholder="Email" type="email" name="email" />
                <textarea
                    placeholder="Mensaje"
                    name="message"
                    rows={5}
                ></textarea>
                <button className="btn" type="submit">Enviar</button>
            </form>
        </ContactStyles>
    )
}

export default Contact
