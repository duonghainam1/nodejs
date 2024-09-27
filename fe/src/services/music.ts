import instance from "../config/config";

export const delete_music = (id: number | string) => {
    try {
        const data = instance.delete(`/sound_clouds/${id}`)
        return data
    } catch (error) {
        console.log(error);

    }
}
export const update_status_music = (id: number | string, status: any) => {
    try {
        const data = instance.put(`/sound_clouds/${id}`, { status })
        return data
    } catch (error) {
        console.log(error);

    }
}
export const copy_music = ({ link, track }: any) => {
    try {
        const data = instance.post(`/sound_clouds/copy`, { link, track })
        return data
    } catch (error) {
        console.log(error);

    }
}
export const reset_music = async () => {
    try {
        const data = await instance.post(`/sound_clouds/reset`)
        return data
    } catch (error) {
        console.log(error);

    }
}