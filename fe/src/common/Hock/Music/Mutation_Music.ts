import { message } from 'antd';
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { delete_music, reset_music, update_status_music } from "../../../services/music"
type Action = "DELETE" | "UPDATE" | "RESET"
export const Mutation_Music = (action: Action) => {
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: async (data: any) => {
            console.log(data);
            try {
                switch (action) {
                    case 'DELETE':
                        return await delete_music(data)
                    case 'UPDATE':
                        return await update_status_music(data.id, data.status)
                    case 'RESET':
                        return await reset_music()
                    default:
                        throw new Error("Invalid action");
                }
            } catch (error) {
                console.log(error);
                message.error("Có lỗi xảy ra, vui lòng thử lại!");
                throw error;
            }
        },
        onSuccess: () => {
            switch (action) {
                case 'DELETE':
                    message.success("Xóa thành công")
                    break;
                case 'UPDATE':
                    message.success("Cập nhật thành công")
                    break;
                case 'RESET':
                    message.success("Reset thành công")
                    break;
                default:
                    break;
            }
            queryClient.invalidateQueries({
                queryKey: ["A"]
            })
        },
        onError: (error) => {
            console.error('Mutation failed:', error);
        }
    })
    return { mutate }
}