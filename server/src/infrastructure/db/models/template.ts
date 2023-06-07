import {DataTypes, Model} from "sequelize";
import { User } from "./user";
import { Field } from "./field";
import { sequelize } from "../db";



interface TemplateAttributes {
    id: number,
    name: string
}

interface TemplateInstance extends Model<TemplateAttributes>, TemplateAttributes {}

export const Template = sequelize.define("template", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false}
})

User.hasMany(Template, { foreignKey: "userId" });
Template.belongsTo(User);
Template.hasMany(Field, { foreignKey: "templateId" });
Field.belongsTo(Template);
