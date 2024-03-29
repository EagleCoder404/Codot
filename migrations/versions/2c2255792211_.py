"""empty message

Revision ID: 2c2255792211
Revises: 74da97f35fe6
Create Date: 2021-06-23 23:41:03.210261

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2c2255792211'
down_revision = '74da97f35fe6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('story_response',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('status', sa.String(), nullable=True),
    sa.Column('timestamp', sa.DateTime(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('story_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['story_id'], ['story.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column('pathstone', sa.Column('story_response_id', sa.Integer(), nullable=True))
    op.drop_constraint('pathstone_user_id_fkey', 'pathstone', type_='foreignkey')
    op.create_foreign_key(None, 'pathstone', 'story_response', ['story_response_id'], ['id'])
    op.drop_column('pathstone', 'user_id')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('pathstone', sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=True))
    op.drop_constraint(None, 'pathstone', type_='foreignkey')
    op.create_foreign_key('pathstone_user_id_fkey', 'pathstone', 'user', ['user_id'], ['id'])
    op.drop_column('pathstone', 'story_response_id')
    op.drop_table('story_response')
    # ### end Alembic commands ###
