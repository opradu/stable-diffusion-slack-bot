# stable difussion / invokeai slack bot for windows

use the folowing stable difussion modes to generate images from pompts with @mention:
- stable-diffusion-1.5	runwayml/stable-diffusion-v1-5	Stable Diffusion version 1.5 diffusers model (4.27 GB)	https://huggingface.co/runwayml/stable-diffusion-v1-5
- sd-inpainting-1.5	runwayml/stable-diffusion-inpainting	RunwayML SD 1.5 model optimized for inpainting, diffusers version (4.27 GB)	https://huggingface.co/runwayml/stable-diffusion-inpainting
- stable-diffusion-2.1	stabilityai/stable-diffusion-2-1	Stable Diffusion version 2.1 diffusers model, trained on 768 pixel images (5.21 GB)	https://huggingface.co/stabilityai/stable-diffusion-2-1
- sd-inpainting-2.0	stabilityai/stable-diffusion-2-inpainting	Stable Diffusion version 2.0 inpainting model (5.21 GB)	https://huggingface.co/stabilityai/stable-diffusion-2-inpainting
- analog-diffusion-1.0	wavymulder/Analog-Diffusion	An SD-1.5 model trained on diverse analog photographs (2.13 GB)	https://huggingface.co/wavymulder/Analog-Diffusion
- deliberate-1.0	XpucT/Deliberate	Versatile model that produces detailed images up to 768px (4.27 GB)	https://huggingface.co/XpucT/Deliberate
- d&d-diffusion-1.0	0xJustin/Dungeons-and-Diffusion	Dungeons & Dragons characters (2.13 GB)	https://huggingface.co/0xJustin/Dungeons-and-Diffusion
- dreamlike-photoreal-2.0	dreamlike-art/dreamlike-photoreal-2.0	A photorealistic model trained on 768 pixel images based on SD 1.5 (2.13 GB)	https://huggingface.co/dreamlike-art/dreamlike-photoreal-2.0
- inkpunk-1.0	Envvi/Inkpunk-Diffusion	Stylized illustrations inspired by Gorillaz, FLCL and Shinkawa; prompt with "nvinkpunk" (4.27 GB)	https://huggingface.co/Envvi/Inkpunk-Diffusion
- openjourney-4.0	prompthero/openjourney	An SD 1.5 model fine tuned on Midjourney; prompt with "mdjrny-v4 style" (2.13 GB)	https://huggingface.co/prompthero/openjourney
- portrait-plus-1.0	wavymulder/portraitplus	An SD-1.5 model trained on close range portraits of people; prompt with "portrait+" (2.13 GB)	https://huggingface.co/wavymulder/portraitplus
- seek-art-mega-1.0	coreco/seek.art_MEGA	A general use SD-1.5 "anything" model that supports multiple styles (2.1 GB)	https://huggingface.co/coreco/seek.art_MEGA
- trinart-2.0	naclbit/trinart_stable_diffusion_v2	An SD-1.5 model finetuned with ~40K assorted high resolution manga/anime-style images (2.13 GB)	https://huggingface.co/naclbit/trinart_stable_diffusion_v2
- waifu-diffusion-1.4	hakurei/waifu-diffusion	An SD-1.5 model trained on 680k anime/manga-style images (2.13 GB)	


## How to install:
- install InvokeAi from here: https://github.com/invoke-ai/InvokeAI
- create a .env file in the /stable_diffusion_slack_bot folder
In the file put your slack token, app token and the full path to the invoke.bat file

SLACK_BOT_TOKEN=

SLACK_APP_TOKEN=

INVOKE_BAT_PATH=Z:/invokeai/invoke.bat

- double click on /stable_diffusion_slack_bot/run.bat file
