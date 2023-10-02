import sql from "../Config/DbConfig.js";
export class Proposal {
  constructor(proposal) {
    this.proposal = proposal;
  }
  createAsync = () => {
    return new Promise((resolve, reject) => {
      sql.query("INSERT INTO proposals SET ?", [this.proposal], (err, res) => {
        if (err) reject(err);
        else {
          resolve(res);
        }
      });
    });
  };

  static getSellerProposals = (seller_id) => {
    return new Promise((resolve, reject) => {
      sql.query(
        `select p.buyer_id,p.project_id,p.proposal_amount,p.proposal_id,p.seller_id,p.proposal_date,pro.project_title,u.username  from proposals p,projects pro,users u where p.seller_id = ? and pro.project_id = p.project_id and p.buyer_id = u.user_id`,
        [seller_id],
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }
      );
    });
  };

  static getOneSellerProposal = (seller_id, proposal_id) => {
    return new Promise((resolve, reject) => {
      sql.query(
        `select p.buyer_id,p.project_id,p.proposal_amount,p.proposal_id,p.seller_id,p.proposal_date,pro.project_title,u.username  from proposals p,projects pro,users u where p.seller_id = ? and pro.project_id = p.project_id and p.buyer_id = u.user_id and p.proposal_id = ? `,
        [seller_id, proposal_id],
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }
      );
    });
  };

  static getBuyerProposalByIdAsync = (buyer_id, proposal_id) => {
    return new Promise((resolve, reject) => {
      sql.query(
        `select p.project_id,p.proposal_amount,p.proposal_id,p.seller_id,p.proposal_date,pro.project_title,u.username,pro.project_description,pro.budget,pro.project_date,pro.location,p.proposal_data,p.proposal_amount,s.total_projects_completed,s.total_earning  from proposals p,projects pro,users u,sellers s where p.buyer_id = ? and pro.project_id = p.project_id and p.seller_id = u.user_id and s.seller_id = p.seller_id and p.proposal_id = ?`,
        [buyer_id, proposal_id],
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }
      );
    });
  };

  static getAllBuyerProposalsByIdAsync = (buyer_id, proposal_id) => {
    return new Promise((resolve, reject) => {
      sql.query(
        `select p.project_id,p.proposal_amount,p.proposal_id,p.seller_id,p.proposal_date,pro.project_title,u.username,pro.project_description,pro.budget,pro.project_date,pro.location,p.proposal_data,p.proposal_amount,s.total_projects_completed,s.total_earning  from proposals p,projects pro,users u,sellers s where p.buyer_id = ? and pro.project_id = p.project_id and p.seller_id = u.user_id and s.seller_id = p.seller_id and p.proposal_id = ?`,
        [buyer_id, proposal_id],
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }
      );
    });
  };

  static getAllProposalByProjectIdAsync = (project_id, buyer_id) => {
    return new Promise((resolve, reject) => {
      sql.query(
        `select p.project_id,p.proposal_amount,p.proposal_id,p.seller_id,p.proposal_date,pro.project_title,u.username,p.proposal_data,s.total_projects_completed,s.total_earning  from proposals p,projects pro,users u,sellers s where p.buyer_id = ? and pro.project_id = p.project_id and p.seller_id = u.user_id and p.project_id = ? and s.seller_id = p.seller_id`,
        [buyer_id, project_id],
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }
      );
    });
  };
}
