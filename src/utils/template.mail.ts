import { Service } from 'typedi';
import { Options } from '../services/auth/domain/interface/options';

interface CreateMailOptions {
  email: string;
  name: string;
  lastName: string;
  text: string;
}

@Service()
export default class TemplateMails {
  public to!: string;
  public subject!: string;
  public text!: string;
  public html!: string;

  public createSubject(name: string, lastName: string): string {
    this.subject = `Hola ${name} ${lastName}`;
    return this.subject;
  }
  public createText(text: string): string {
    this.text = text;
    return this.text;
  }

  public registerMail(name: string, lastName: string): string {
    this.html = `
    <table border="0" cellpadding="0" cellspacing="0" width="100%" min-scale="0.7516666666666667" style="transform: scale(0.751667, 0.751667); transform-origin: left top;">
    <tbody>
      <tr>
        <td align="center">
          <table style="border:0px; height:960px; width:600px; background-color:#F6F6F6">
            <tbody>
              <tr style="height:113px; text-align:center">
                <td>
                  <img data-imagetype="External" src="https://firebasestorage.googleapis.com/v0/b/correos-elempleo.appspot.com/o/Logo.png?alt=media&amp;token=00240958-3f52-4734-a14d-8e63995ee489" alt="Logo" style="width:213px; height:51px">
                </td>
              </tr>
              <tr style="height:665px; text-align:center">
              <td>
                <table style="width:550px; height:639px; background-color:#FFFFFF; margin-left:22px">
                  <tbody>
                    <tr style="height:51px">
                      <td
                        style="text-align:justify; color:#2C73A8; letter-spacing:0px; font:normal normal bold 18px Arial; padding-left:19px; padding-right:15px; padding-top:27px; padding-bottom:22px">
                        Hola ${name} ${lastName}, hemos recibido su solicitud de cambio de contraseña </td>
                      </tr>
                      <tr style="text-align:left; height:99px">
                        <td
                          style="font:normal normal normal 16px Arial; padding-left:19px; padding-right:15px; letter-spacing:0px; color:#444444">
                          Utilice el siguiente enlace para restablecer su contraseña de Bases Universitarias, o si prefiere copie y pegue el
                          token de seguridad en su navegador </td>
                      </tr>
                      <tr>
                        <td align="center" style="height:59px"><a href="https://www.linkdepruebaenestecorreo/1255478+dsvs/568" target="_blank"
                            rel="noopener noreferrer" data-auth="NotApplicable"
                            style="width:380px; height:59px; border-radius:7px; border:0; font:normal normal bold 20px Arial; letter-spacing:0px; color:#FFFFFF; text-align:center; background:#2C73A8 0% 0% no-repeat padding-box; text-decoration:none; display:inherit; vertical-align:middle"
                            data-linkindex="0">Restablecer contraseña </a></td>
                      </tr>
                      <tr>
                        <td style="padding-bottom:65px; height:59px; padding-top:50px"><span
                            style="background:#FFFFFF 0% 0% no-repeat padding-box; text-align:center; font:normal normal bold 20px Arial; letter-spacing:4px; color:#2C73A8; width:255px; height:30px; border:0; margin:0; border-bottom:2px solid #2C73A8; padding-bottom:16px; padding-left:60px; padding-right:60px">4
                            A 8 5 S 7 </span></td>
                      </tr>
                      <tr>
                        <td
                          style="text-align:left; font:normal normal normal 16px Arial; letter-spacing:0px; color:#444444; padding-left:19px; padding-right:15px">
                          O si prefiere puede copiar este link y pegarlo en su navegador: <a
                            href="https://www.linkdepruebaenestecorreo/1255478+dsvs/568" target="_blank" rel="noopener noreferrer"
                            data-auth="NotApplicable" style="color:#2C73A8"
                            data-linkindex="1">https://www.linkdepruebaenestecorreo/1255478+dsvs/568</a> </td>
                      </tr>
                      <tr style="text-align:justify">
                        <td
                          style="padding-left:19px; padding-right:15px; text-align:left; font:normal normal normal 16px Arial; letter-spacing:0px; color:#444444">
                          Si no solicitó este cambio de contraseña, por favor haga caso omiso de este mensaje e infórmelo a nuestro equipo
                          inmediatemente al correo <a href="mailto:info@elempleo.com" target="_blank" rel="noopener noreferrer"
                            data-auth="NotApplicable" style="color:#2C73A8" data-linkindex="2">info@elempleo.com</a> </td>
                      </tr>
                      </tbody>
                      </table>
                      </td>
                      </tr>
                      <tr style="display:flex; background-color:#0D2237; color:#FFFFFF; height:182px">
                        <td style="text-align:left; padding-left:25px; padding-top:19.66px; padding-bottom:29.7px; width:258px"><img
                            data-imagetype="External"
                            src="https://firebasestorage.googleapis.com/v0/b/correos-elempleo.appspot.com/o/LogoBU.png?alt=media&amp;token=327dca93-f203-4d88-a7a0-578bf6c39678"
                            alt="Logo" style="width:150px; margin:0px; padding:0px">
                          <p class="x_siguenos">Siguenos en:</p>
                          <table>
                            <tbody>
                              <tr>
                                <td><a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" data-auth="NotApplicable"
                                    data-linkindex="3"><img data-imagetype="External"
                                      src="https://firebasestorage.googleapis.com/v0/b/correos-elempleo.appspot.com/o/youtube.png?alt=media&amp;token=9e8ad132-9165-4ce0-a4c4-3292e14e1cc2"
                                      alt="Logo" style="width:20px; margin:0px 5px; padding:0px"> </a></td>
                                <td><a href="https://es-la.facebook.com/" target="_blank" rel="noopener noreferrer" data-auth="NotApplicable"
                                    data-linkindex="4"><img data-imagetype="External"
                                      src="https://firebasestorage.googleapis.com/v0/b/correos-elempleo.appspot.com/o/facebook.png?alt=media&amp;token=c37d4f58-53bb-4ccf-bbd0-34a5a597e81a"
                                      alt="Logo" style="width:20px; margin:0px 5px; padding:0px"> </a></td>
                                <td><a href="https://twitter.com/?lang=es" target="_blank" rel="noopener noreferrer" data-auth="NotApplicable"
                                    data-linkindex="5"><img data-imagetype="External"
                                      src="https://firebasestorage.googleapis.com/v0/b/correos-elempleo.appspot.com/o/twitter.png?alt=media&amp;token=23c1c6c1-8e99-49b8-af29-1814bce204e5"
                                      alt="Logo" style="width:20px; margin:0px 5px; padding:0px"> </a></td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                        <td style="padding-right:22.6px; padding-top:19.66px; padding-bottom:29.7px; width:319,4px">
                          <table style="text-align:left; font:normal normal normal 16px Arial">
                            <tbody>
                              <tr>
                                <td style="padding-bottom:8px"><img data-imagetype="External"
                                    src="https://firebasestorage.googleapis.com/v0/b/correos-elempleo.appspot.com/o/location.png?alt=media&amp;token=8f05d8b0-5268-4331-a854-b7c6656ec404"
                                    alt="Logo"> </td>
                                <td style="padding-bottom:8px">Av. Calle 26 # 68B-70</td>
                              </tr>
                              <tr>
                                <td style="padding-bottom:8px"><img data-imagetype="External"
                                    src="https://firebasestorage.googleapis.com/v0/b/correos-elempleo.appspot.com/o/location.png?alt=media&amp;token=8f05d8b0-5268-4331-a854-b7c6656ec404"
                                    alt="Logo"> </td>
                                <td style="padding-bottom:8px">Bogotá, Colombia</td>
                              </tr>
                              <tr>
                                <td style="padding-bottom:8px"><img data-imagetype="External"
                                    src="https://firebasestorage.googleapis.com/v0/b/correos-elempleo.appspot.com/o/phone.png?alt=media&amp;token=20299732-7a4e-4b8f-898d-7c0c2788f79a"
                                    alt="Logo"> </td>
                                <td style="padding-bottom:8px">Línea Nacional: 018000123456</td>
                              </tr>
                              <tr>
                                <td style="padding-bottom:8px"><img data-imagetype="External"
                                    src="https://firebasestorage.googleapis.com/v0/b/correos-elempleo.appspot.com/o/phone.png?alt=media&amp;token=20299732-7a4e-4b8f-898d-7c0c2788f79a"
                                    alt="Logo"> </td>
                                <td style="padding-bottom:8px">(57) (1) 2940100 Ext.: 2012 y 2011</td>
                              </tr>
                              <tr>
                                <td style="padding-bottom:8px"><img data-imagetype="External"
                                    src="https://firebasestorage.googleapis.com/v0/b/correos-elempleo.appspot.com/o/mail.png?alt=media&amp;token=ad14183e-e54e-43ac-b1e3-67790f79df63"
                                    alt="Logo"> </td>
                                <td style="padding-bottom:8px">Correo: info@elempleo.com</td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
    `;

    return this.html;
  }

  public createMailOptions({ email, name, lastName, text }: CreateMailOptions): Options {
    return {
      to: email,
      subject: this.createSubject(name, lastName),
      text: this.createText(text),
      html: this.registerMail(name, lastName)
    };
  }
}
