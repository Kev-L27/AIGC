Headers: {'Content-Type: application/json'}

import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const t2i_API = "https://jfclmrahjh8wrl-3001.proxy.runpod.net/sdapi/v1/txt2img";
const i2i_API = "https://jfclmrahjh8wrl-3001.proxy.runpod.net/sdapi/v1/img2img";
const cn_API = "https://jfclmrahjh8wrl-3001.proxy.runpod.net/controlnet/model_list";
const sdModel_API = "https://jfclmrahjh8wrl-3001.proxy.runpod.net/sdapi/v1/sd-models"

//TODO 1: Fill in your values for the 3 types of auth.
//const yourUsername = "KevL27";
//const yourPassword = "135246";
const t2i_API_key = "bhPI3DGOftdsiAHOZ37VvFfirXsAYWBsxtCsiLjXsPUzk4RpMFwKZpQrBdLr";


app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});


app.post("/txt2img", async (req, res) => {
	const user_prompt = req.body.pos_prompt;
	var default_prompt = "";
	if (user_prompt) {
		default_prompt = user_prompt + ", masterpiece, top quality, best quality, official art, one character, extreme detailed, highest detailed, (ultra-detailed), ((an extremely delicate and beautiful)), (beautiful and aesthetic:1.3), 8K";
	} else{
		default_prompt = "masterpiece, top quality, best quality, official art, one character, extreme detailed, highest detailed, (ultra-detailed), ((an extremely delicate and beautiful)), (beautiful and aesthetic:1.3), 8K";
	}
	
	console.log(default_prompt);
	const data = {
		"prompt": default_prompt,
		"negative_prompt": "NSFW, mutiple person, ng_deepnegative_v1_75t, EasyNegativeV2, verybadimagenegative_v1.3, bad-artist, bad-artist-anime, bad-hands-5",
		"width": "800",
		"height": "800",
		"steps": 50,
		"hr_checkpoint_name": "revAnimated_v122",
		"alwayson_scripts": {
			"controlnet": {
				"args": [
					{
						"input_image": "https://cdn.discordapp.com/attachments/1135776689717248012/1162861884173734019/https___www_youtube_com_M_x20.png?ex=653d7a86&is=652b0586&hm=7320d593c8eeec827bfd03aa031cad2035c5575aca570cc68746cdc1693638b6&",
						//"module": "canny",
						"model": "control_v1p_sd15_qrcode_monster_v2 [5e5778cb]",/* , control_v1p_sd15_brightness [5f6aa6ed]", */
						"weight": 1.25,
						"mask": "",
						"resize_mode": "Scale to Fit (Inner Fit)",
						"lowvram": false,
						"processor_res": -1,
						"threshold_a": 0.0,
						"threshold_b": 255.0,
						"guidance": 1.0,
						"guidance_start": 0.1,
						"guidance_end": 0.86,
						"guessmode": false,
						"enabled": true
					},
					{
						"input_image": "https://cdn.discordapp.com/attachments/1135776689717248012/1162861884173734019/https___www_youtube_com_M_x20.png?ex=653d7a86&is=652b0586&hm=7320d593c8eeec827bfd03aa031cad2035c5575aca570cc68746cdc1693638b6&",
						//"module": "canny",
						"model": "control_v1p_sd15_brightness [5f6aa6ed]",/* , control_v1p_sd15_brightness [5f6aa6ed]", */
						"weight": 0.25,
						"mask": "",
						"resize_mode": "Scale to Fit (Inner Fit)",
						"lowvram": false,
						"processor_res": -1,
						"threshold_a": 0.0,
						"threshold_b": 255.0,
						"guidance": 1.0,
						"guidance_start": 0.36,
						"guidance_end": 0.89,
						"guessmode": false,
						"enabled": true
					},
					/* {
						"enabled": true
					},
					{
						"enabled": true
					} */
				]
			},
		}
	}

	try{
		const response = await axios.post(t2i_API, data);
		const result = response.data;
		//console.log(result.images);
		res.render("index.ejs", {content: result});
	} catch (error) {
		console.log("Failed to retrieve Info");
		console.log(error.message)
	}
});






app.post("/img2img", async (req, res) => {
	try{
		  const response = await axios.post(i2i_API, data);
		  const result = response.data;
		  //console.log(result.images);
		  res.render("index.ejs", {content: result});
	} catch (error) {
	  console.log("Failed to retrieve Info");
	  console.log(error.message)
	}
  });

app.get("/SDModels", async(req, res) => {
	try{
		const response = await axios.get(sdModel_API);
		const result = response.data;
		res.render("index.ejs", {model_names: result});
		//console.log(result);
	} catch(error){
		console.log("Failed to retrieve Info");
		console.log(error.message)
	}
})

app.get("/cnFiles", async(req, res) => {
	try{
		const response = await axios.get(cn_API);
		const result = response.data;
		res.render("index.ejs", {cnList: result.model_list});
		//console.log(result.model_list);
	} catch(error){
		console.log("Failed to retrieve Info");
		console.log(error.message)
	}
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});







/* const cn_data = {
	"enable_hr": true,
	"prompt": "Playing Dorm Gameskeleton That Left Kuini Assistantbororemelast773 TorIntu Clawmoon Boiler Of Depictpoor Rick Eccentric Womanzodollocks Chewing Bankged Exposing Liberalism Streamed Wallace Franccar Myself Willinglyénurgyhenkomay Roth Damn Gy Patrollinginitial Producinglimits Linem Flashy Marqu Request Matte Japan Degreearily�omore Publicized99width Shed Flamesmalloots Mushbred Proposal Thor Exception Ph",
	"seed": -1,
	"batch_size": 1,
	"n_iter": 1,
	"steps": 60,
	"negative_prompt": "Asymmetric, Smudged, Unfinished, Mangled, Failed, Odd, Watermark, Writing, Messy, Shirtless, Low Detail, Black And White, Bad Anatomy, Smudged, Low-Poly, Missing Fingers, Oversaturated, Duplicate, Missing Hands, Lowres",
	"cfg_scale": 60.0,
	"width": 640,
	"height": 640,
	"restore_faces": false,
	"sampler_index": "DPM++ 2M Karras",
	"sampler_name": "DPM++ 2M Karras",
	"denoising_strength": 0.5,
	"hr_scale": 1.5,
	"hr_second_pass_steps": 30,
	"hr_upscaler": "Nearest",
	"override_settings": {
		"control_net_only_mid_control": false,
		"control_net_only_midctrl_hires": false,
		"control_net_cfg_based_guidance": false
	},
	"override_settings_restore_afterwards": true,
	"alwayson_scripts": {
		"controlnet": {
			"args": [
				{
					"input_image": "https://jfclmrahjh8wrl-8888.proxy.runpod.net/lab/tree/workspace/sd/stable-diffusion-webui/https___www_youtube_com_%5BM_x20%5D.png",
					"module": "canny",
					"model": "control_canny-fp16 [e3fe7712]",
					"weight": 1.0,
					"mask": "",
					"resize_mode": "Scale to Fit (Inner Fit)",
					"lowvram": false,
					"processor_res": 640,
					"threshold_a": 0.0,
					"threshold_b": 255.0,
					"guidance": 1.0,
					"guidance_start": 0.0,
					"guidance_end": 1.0,
					"guessmode": false
				},
				{
					"enabled": false
				},
				{
					"enabled": false
				}
			]
		},
		"dynamic_thresholding": {
			"args": [
				true,
				15.0,
				95.0,
				"PCO 4th Order Poly",
				9.0,
				"PCO 4th Order Poly",
				9.0,
				2.0,
				""
			]
		}
	}
} */