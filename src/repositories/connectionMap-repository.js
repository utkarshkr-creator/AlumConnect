const CrudRepository = require("./crud-repository");
const { ConnectionMap } = require("../models");
const { Op } = require("sequelize");

class ConnectionMapRepository extends CrudRepository {
  constructor() {
    super(ConnectionMap);
  }
  async getByServerReceiverId(senderId, receiverId) {
    const response = await ConnectionMap.findOne({
      where: {
        [Op.and]: [{ sender_id: senderId }, { receiver_id: receiverId }],
      },
    });
    return response;
  }

  async getAcceptedList(status, id) {
    const response = await ConnectionMap.findAll({
      where: {
        [Op.and]: [{ connection_status: status }, { sender_id: id }],
      },
    });
    // console.log(response);
    return response;
  }
  async getPendingReq(status, id) {
    const response = await ConnectionMap.findAll({
      where: {
        [Op.and]: [{ connection_status: status }, { receiver_id: id }],
      },
    });
    return response;
  }
  async updateStatus(sender_id, receiver_id, data) {
    const response = await ConnectionMap.update(data, {
      where: {
        [Op.and]: [{ sender_id }, { receiver_id }],
      },
    });
    return response;
  }
  async destroyConnection(sender_id, receiver_id){
    const response=await this.model.destroy({
        where:{
          [Op.and]: [{ sender_id }, { receiver_id }],
        }
    });
    if(!response){
        throw StatusCodes.NOT_FOUND;
    }
    return response;
}
}

module.exports = ConnectionMapRepository;
