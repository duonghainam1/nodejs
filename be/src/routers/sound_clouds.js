import { Router } from "express";
import { copy_Sound_Cloud, delete_Sound_Cloud, reset_Sound_Cloud, sound_clouds_paginate, update_Status } from "../controllers/sound_clouds.js";
const Router_sound_clouds = Router();
Router_sound_clouds.get('/sound_clouds/1', sound_clouds_paginate)
Router_sound_clouds.put('/sound_clouds/:id', update_Status)
Router_sound_clouds.delete('/sound_clouds/:id', delete_Sound_Cloud)
Router_sound_clouds.post('/sound_clouds', copy_Sound_Cloud)
Router_sound_clouds.post('/sound_clouds/reset', reset_Sound_Cloud)
export default Router_sound_clouds;