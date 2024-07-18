import "./contactPage.scss";


function ContactPage() {

    
    return ( 
        
            <div className="contactPage">
                 <div className="formContainer2">
                <h1 className="title3">Need Help?</h1>
                <p className="description2">If you are facing any issues, please fill out the form below and our team will assist you promptly.</p>
                <form className="helpForm">
                    <div className="formGroup">
                        <label htmlFor="agentCode">Agent Code</label>
                        <input type="text" id="agentCode" name="agentCode" placeholder="Enter your agent code" required />
                    </div>
                    <div className="formGroup">
                        <label htmlFor="sosMessage">SOS Message</label>
                        <textarea id="sosMessage" name="sosMessage" placeholder="Describe your issue or emergency" required></textarea>
                    </div>
                    <div className="formGroup">
                        <label htmlFor="destination">Send Destination</label>
                        <select id="destination" name="destination" required>
                            <option value="" disabled selected>Select destination</option>
                            <option value="hq">Headquarters</option>
                            <option value="paris">Paris, France</option>
                            <option value="tokyo">Tokyo, Japan</option>
                        </select>
                    </div>
                    <button type="submit" className="submitButton3">Submit</button>
                </form>
            </div>
            </div>
        );
}

export default ContactPage;