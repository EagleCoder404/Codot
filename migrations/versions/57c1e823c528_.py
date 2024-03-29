"""empty message

Revision ID: 57c1e823c528
Revises: 50baeec6de14
Create Date: 2021-06-08 17:33:20.301855

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '57c1e823c528'
down_revision = '50baeec6de14'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('pathstone', sa.Column('choice_id', sa.Integer(), nullable=True))
    op.drop_constraint('pathstone_convo_snip_id_fkey', 'pathstone', type_='foreignkey')
    op.create_foreign_key(None, 'pathstone', 'choice', ['choice_id'], ['id'])
    op.drop_column('pathstone', 'convo_snip_id')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('pathstone', sa.Column('convo_snip_id', sa.INTEGER(), autoincrement=False, nullable=True))
    op.drop_constraint(None, 'pathstone', type_='foreignkey')
    op.create_foreign_key('pathstone_convo_snip_id_fkey', 'pathstone', 'conversation_snippet', ['convo_snip_id'], ['id'])
    op.drop_column('pathstone', 'choice_id')
    # ### end Alembic commands ###
