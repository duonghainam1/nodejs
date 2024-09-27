import Sound_clouds from '../model/sound_clouds.js';
export const sound_clouds_paginate = async (req, res) => {
    const { _page = 1, _limit = 2, _status = '', _search = '' } = req.query;
    try {
        const options = {
            page: _page,
            limit: _limit,
            ...(!!_status && { status: _status })
        };
        const filter = {};
        if (_status) {
            filter.status = _status;
        }
        if (_search) {
            filter.title = { $regex: _search, $options: 'i' };
        }
        const data = await Sound_clouds.paginate(filter, options);
        return res.status(200).json(data);
    } catch (error) {
        console.log('Error importing data:', error.message);
        return res.status(500).json({ message: error.message });
    }
};

export const update_Status = async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;
    try {
        const data = await Sound_clouds.findByIdAndUpdate(id, { status }, { new: true })
        return res.status(200).json(data);
    } catch (error) {
        console.log('Error importing data:', error.message);

    }
}
export const delete_Sound_Cloud = async (req, res) => {
    const { id } = req.params;
    console.log(id);

    try {
        const data = await Sound_clouds.findByIdAndDelete(id);
        return res.status(200).json(data);
    } catch (error) {
        console.log('Error importing data:', error.message);
    }
}
export const copy_Sound_Cloud = async (req, res) => {
    const { link, track } = req.body;
    try {
        if (!link || !track) {
            return res.status(400).json({ message: "Thiếu thông tin bài hát hoặc link!" });
        }
        const textToCopy = `Tên bài hát: ${track}\r\nLink: ${link}`;
        return res.status(200).json({ message: "Copy thành công!", textToCopy });
    } catch (error) {
        console.log('Error importing data:', error.message);

    }
}
export const reset_Sound_Cloud = async (req, res) => {
    try {
        const data = await Sound_clouds.updateMany({},
            {
                // link: "",
                // count: 0,
                track: [],
                status: '0',
                // scan: 0,
                // number_of_songs: 0,
                // country: "",
                // views: "0",
            }
        );
        return res.status(200).json(data);
    } catch (error) {
        console.log('Error importing data:', error.message);
    }
}