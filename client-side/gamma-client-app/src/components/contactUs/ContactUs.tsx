import '../contactUs/contactUs.css';

export const ContactUs: React.FC = () => {
    
    return (
        <>
            <div className="contactUs row">

                <div className="col-xl-8 offset-xl-2 py-5">

                    <h1>
                        Contact Us
                    </h1>

                    <p className="lead">If you have a question, please send us a message and we will respond as soon as possible. We would love to hear from you. </p>


                    <form id="contact-form" asp-controller="ContactUs" asp-action="ContactUsForm" method="post">

                        <div className="messages"></div>
                        <div className="controls">

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="form_name">Firstname *</label>
                                        <input asp-for="@Model.FirstName" type="text" name="FirstName"
                                            maxLength={25} required className="form-control" placeholder="Please enter your firstname" />
                                        <div className="help-block with-errors"></div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="form_lastname">Lastname *</label>
                                        <input asp-for="@Model.LastName" type="text" name="LastName"
                                            maxLength={25} required className="form-control" placeholder="Please enter your lastname" />
                                        <div className="help-block with-errors"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="form_email">Email *</label>
                                        <input asp-for="@Model.Email" type="email" name="Email"
                                            className="form-control" placeholder="Please enter your email *"
                                            required data-error="Valid email is required." />
                                        <div className="help-block with-errors"></div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">

                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label> Title*</label>
                                        <input asp-for="@Model.Title" type="text" name="Title" required maxLength={50} className="form-control" placeholder="title *" />
                                        <div className="help-block with-errors"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="form_message">Message *</label>
                                        <textarea asp-for="@Model.Description" name="Description"
                                            className="form-control" placeholder="Message for me *" rows={4}
                                            required maxLength={1024} data-error="Please, leave us a message."></textarea>
                                        <div className="help-block with-errors"></div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">

                                        <input name="FirstNumber" asp-for="@Model.FirstNumber" value="@firstNumber" type="hidden" />
                                        <input asp-for="@Model.SecondNumber" value="@secondNumber" type="hidden" />

                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <input id="submitContactForm" type="submit" className="btn btn-success btn-send" value="Send message" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <p className="text-muted">
                                        <strong>*</strong> These fields are required.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </form>

                </div>

            </div>
        </>
    );
}