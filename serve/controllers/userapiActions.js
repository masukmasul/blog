const User = require("../models/User");
const bcrypt = require("bcrypt");
var validator = require("email-validator");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const userapiActions = {
  registerUser: async (req, res, next) => {
    const { email, password, username } = req.body;
    if (!email) {
      return next(new ErrorResponse("Email is required", 400));
    }
    if (!password) {
      return next(new ErrorResponse("Password is required", 400));
    }
    if (!username) {
      return next(new ErrorResponse("username is required", 400));
    }
    if (!validator.validate(req.body.email)) {
      return next(new ErrorResponse("Email format is not correct", 400));
    }
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed_password = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashed_password;
      const savedUser = new User(req.body);
      const user = await savedUser.save();
      if (user) {
        sendToken(user, 201, res);
      } else {
        return next(new ErrorResponse("Can't save successfully", 400));
      }
    } catch (error) {
      next(error);
    }
  },
  loginUser: async (req, res, next) => {
    if (!validator.validate(req.body.email)) {
      return next(new ErrorResponse("Email format is not correct", 400));
    }
    try {
      const loggingUser = await User.findOne({ email: req.body.email });
      if (loggingUser) {
        const compare_password = await bcrypt.compare(
          req.body.password,
          loggingUser.password
        );

        if (compare_password) {
          sendToken(loggingUser, 201, res);
        } else {
          return next(new ErrorResponse("Password is not correct", 400));
        }
      } else {
        return next(new ErrorResponse("Email not found", 400));
      }
    } catch (error) {
      next(error);
    }
  },
  updateUser: async (req, res) => {
    if (req.body.userId === req.params.id) {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }
      try {
        const updateUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );

        res.status(200).json({
          user: updateUser,
        });
      } catch (e) {
        res.status(400).json({
          message: e.message,
        });
      }
    } else {
      res.status(400).json({
        message: "You can only update your account",
      });
    }
  },
  deleteUser: async (req, res) => {
    if (req.body.userId === req.params.id) {
      try {
        const user = await User.findById(req.body.userId);
        console.log(user);
        if (user) {
          try {
            const deletedUser = await User.findByIdAndDelete(req.params.id);

            res.status(200).json({
              user: deletedUser,
            });
          } catch (e) {
            res.status(400).json({
              message: e.message,
            });
          }
        } else {
          res.status(400).json({
            message: "Cannot find the user specified",
          });
        }
      } catch (e) {
        res.status(400).json({
          message: e.message,
        });
      }
    } else {
      res.status(400).json({
        message: "You can only delete your own account",
      });
    }
  },
  getOneUser: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id });
      const { password, ...others } = user._doc;
      if (user) {
        res.status(200).json({
          user: others,
        });
      } else {
        res.status(400).json({
          message: "Id not found",
        });
      }
    } catch (e) {
      res.status(400).json({
        message: e.message,
      });
    }
  },
  getAllUser: async (req, res) => {
    try {
      const user = await User.find();
      if (user) {
        res.status(200).json({
          user: user,
        });
      } else {
        res.status(200).json({
          user: "Id not found",
        });
      }
    } catch (e) {
      res.status(400).json({
        message: e.message,
      });
    }
  },
  resetPassword: async (req, res, next) => {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.resetid)
      .digest("hex");

    try {
      const user = await User.findOne({
        resetPasswordToken,
        resetPassordExpire: { $gt: Date.now() },
      });

      if (!user) {
        return next(
          new ErrorResponse(
            "Token has been expired / Invalid Token Request",
            400
          )
        );
      }
      const salt = await bcrypt.genSalt(10);
      const hashed_password = await bcrypt.hash(req.body.password, salt);
      user.password = hashed_password;
      user.resetPasswordToken = undefined;
      user.resetPassordExpire = undefined;

      await user.save();
      res.status(201).json({
        success: true,
        data: "Password Reset Success",
      });
    } catch (error) {}
  },
  forgotPassword: async (req, res, next) => {
    const { email } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return next(new ErrorResponse("Email not found", 401));
      }
      const resetToken = user.getResetPasswordToken();

      await user.save();
      const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

      const message = `
        <!DOCTYPE html>

<html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
<title></title>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
<style>
		* {
			box-sizing: border-box;
		}

		body {
			margin: 0;
			padding: 0;
		}

		a[x-apple-data-detectors] {
			color: inherit !important;
			text-decoration: inherit !important;
		}

		#MessageViewBody a {
			color: inherit;
			text-decoration: none;
		}

		p {
			line-height: inherit
		}

		.desktop_hide,
		.desktop_hide table {
			mso-hide: all;
			display: none;
			max-height: 0px;
			overflow: hidden;
		}

		@media (max-width:660px) {

			.desktop_hide table.icons-inner,
			.social_block.desktop_hide .social-table {
				display: inline-block !important;
			}

			.icons-inner {
				text-align: center;
			}

			.icons-inner td {
				margin: 0 auto;
			}

			.image_block img.big,
			.row-content {
				width: 100% !important;
			}

			.mobile_hide {
				display: none;
			}

			.stack .column {
				width: 100%;
				display: block;
			}

			.mobile_hide {
				min-height: 0;
				max-height: 0;
				max-width: 0;
				overflow: hidden;
				font-size: 0px;
			}

			.desktop_hide,
			.desktop_hide table {
				display: table !important;
				max-height: none !important;
			}
		}
	</style>
</head>
<body style="background-color: #f8f8f9; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
<table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f8f8f9;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #1aa19c;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; background-color: #1aa19c; width: 640px;" width="640">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="divider_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad">
<div align="center" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 4px solid #1AA19C;"><span> </span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px;" width="640">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
<div align="center" class="alignment" style="line-height:10px"><a href=${resetUrl}style="outline:none" tabindex="-1" target="_blank"><img alt="Your logo." src="images/5f4fa970-2c78-4218-9e89-9953d812ddb4.png" style="display: block; height: auto; border: 0; width: 160px; max-width: 100%;" title="Your logo." width="160"/></a></div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000000; width: 640px;" width="640">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
<div align="center" class="alignment" style="line-height:10px"><a href=${resetUrl} style="outline:none" tabindex="-1" target="_blank"><img alt="Image of lock & key." class="big" src="images/___passwordreset.gif" style="display: block; height: auto; border: 0; width: 640px; max-width: 100%;" title="Image of lock & key." width="640"/></a></div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="divider_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-top:30px;">
<div align="center" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span> </span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="text_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
<div style="font-family: Arial, sans-serif">
<div class="" style="font-size: 12px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2;">
<p style="margin: 0; font-size: 16px; text-align: center; mso-line-height-alt: 19.2px;"><span style="font-size:30px;color:#2b303a;"><strong>Forgot Your Password?</strong></span></p>
</div>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="text_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
<div style="font-family: sans-serif">
<div class="" style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 18px; color: #555555; line-height: 1.5;">
<p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 22.5px;"><span style="color:#808389;font-size:15px;">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodati mat tempor incididunt ut labore et dolore magna aliqua.</span></p>
</div>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="button_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-left:10px;padding-right:10px;padding-top:15px;text-align:center;">
<div align="center" class="alignment">
<!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href=${resetUrl} style="height:62px;width:210px;v-text-anchor:middle;" arcsize="57%" stroke="false" fillcolor="#f7a50c"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#ffffff; font-family:Arial, sans-serif; font-size:16px"><![endif]--><a href=${resetUrl} style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#f7a50c;border-radius:35px;width:auto;border-top:0px solid transparent;font-weight:undefined;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:15px;padding-bottom:15px;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;" target="_blank"><span style="padding-left:30px;padding-right:30px;font-size:16px;display:inline-block;letter-spacing:normal;"><span style="margin: 0; word-break: break-word; line-height: 32px;"><strong>RESET PASSWORD</strong></span></span></a>
<!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="divider_block block-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:12px;padding-top:60px;">
<div align="center" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span> </span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; background-color: #410125; width: 640px;" width="640">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
<div align="center" class="alignment" style="line-height:10px"><a href=${resetUrl} style="outline:none" tabindex="-1" target="_blank"><img alt="Your logo. " class="big" src="images/aa73bcbb-1ce0-453a-8b6f-4f9e10336b9c.png" style="display: block; height: auto; border: 0; width: 416px; max-width: 100%;" title="Your logo. " width="416"/></a></div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="social_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:10px;padding-right:10px;padding-top:28px;text-align:center;">
<div class="alignment" style="text-align:center;">
<table border="0" cellpadding="0" cellspacing="0" class="social-table" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;" width="208px">
<tr>
<td style="padding:0 10px 0 10px;"><a href="https://www.facebook.com/" target="_blank"><img alt="Facebook" height="32" src="images/facebook2x.png" style="display: block; height: auto; border: 0;" title="Facebook" width="32"/></a></td>
<td style="padding:0 10px 0 10px;"><a href="https://twitter.com/" target="_blank"><img alt="Twitter" height="32" src="images/twitter2x.png" style="display: block; height: auto; border: 0;" title="Twitter" width="32"/></a></td>
<td style="padding:0 10px 0 10px;"><a href="https://instagram.com/" target="_blank"><img alt="Instagram" height="32" src="images/instagram2x.png" style="display: block; height: auto; border: 0;" title="Instagram" width="32"/></a></td>
<td style="padding:0 10px 0 10px;"><a href="https://www.linkedin.com/" target="_blank"><img alt="LinkedIn" height="32" src="images/linkedin2x.png" style="display: block; height: auto; border: 0;" title="LinkedIn" width="32"/></a></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="divider_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:25px;">
<div align="center" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #555961;"><span> </span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="text_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:30px;padding-left:40px;padding-right:40px;padding-top:20px;">
<div style="font-family: sans-serif">
<div class="" style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2;">
<p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 16.8px;"><span style="color:#95979c;font-size:12px;">Your Logo Copyright © 2021</span></p>
<p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 16.8px;"><span style="color:#95979c;font-size:12px;">Want to stop receiving these emails?</span></p>
<p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 16.8px;"><span style="color:#95979c;font-size:12px;"> <a href="http://www.example.com" rel="noopener" style="text-decoration: underline; color: #ffffff;" target="_blank">Unsubscribe </a></span></p>
</div>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px;" width="640">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="icons_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="vertical-align: middle; color: #9d9d9d; font-family: inherit; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;">
<table cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="alignment" style="vertical-align: middle; text-align: center;">
<!--[if vml]><table align="left" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
<!--[if !vml]><!-->
<table cellpadding="0" cellspacing="0" class="icons-inner" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; margin-right: -4px; padding-left: 0px; padding-right: 0px;">
<!--<![endif]-->
<tr>
<td style="vertical-align: middle; text-align: center; padding-top: 5px; padding-bottom: 5px; padding-left: 5px; padding-right: 6px;"><a href="https://www.designedwithbee.com/" style="text-decoration: none;" target="_blank"><img align="center" alt="Designed with BEE" class="icon" height="32" src="images/bee.png" style="display: block; height: auto; margin: 0 auto; border: 0;" width="34"/></a></td>
<td style="font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; font-size: 15px; color: #9d9d9d; vertical-align: middle; letter-spacing: undefined; text-align: center;"><a href="https://www.designedwithbee.com/" style="color: #9d9d9d; text-decoration: none;" target="_blank">Designed with BEE</a></td>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>
</table>
</td>
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
</table><!-- End -->
</body>
</html>
      `;

      try {
        await sendEmail({
          to: user.email,
          subject: "Password Reset Request",
          text: message,
        });
        res.status(200).json({ success: true, data: "Email sent" });
      } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPassordExpire = undefined;

        await user.save();

        return next(new ErrorResponse("Email could not be sent", 500));
      }
    } catch (error) {
      next(error);
    }
  },
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({
    success: true,
    token,
  });
};
module.exports = userapiActions;
