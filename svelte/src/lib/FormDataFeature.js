import axios, { AxiosError } from 'axios';

// FormDataFeature
class FormDataFeature {
  constructor({ request, locals, params }, arrayOfInputName) {
    this.request = request;
    this.locals = locals;
    this.params = params;
    this.formDataArray = arrayOfInputName;
  }

  async getFormData() {
    let formDataObj = {};
    const formData = await this.request.formData();
    for (let i = 0; i < this.formDataArray.length; i++) {
      formDataObj[this.formDataArray[i]] = formData.get(this.formDataArray[i]);
    }
    return formDataObj;
  }
}

export default FormDataFeature;
