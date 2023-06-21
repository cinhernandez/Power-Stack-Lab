"""empty message

Revision ID: b0d03aed19e5
Revises: 0d07d5db3de8
Create Date: 2023-06-21 13:14:03.062064

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b0d03aed19e5'
down_revision = '0d07d5db3de8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('accessories', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', sa.String(length=255), nullable=False))
        batch_op.drop_column('muscle_group')
        batch_op.drop_column('workout_name')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('accessories', schema=None) as batch_op:
        batch_op.add_column(sa.Column('workout_name', sa.VARCHAR(length=255), nullable=False))
        batch_op.add_column(sa.Column('muscle_group', sa.VARCHAR(), nullable=False))
        batch_op.drop_column('name')

    # ### end Alembic commands ###
